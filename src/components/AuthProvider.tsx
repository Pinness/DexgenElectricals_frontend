import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isAdmin: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isAdmin: false,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Ref to track the current ID of the checkAdminStatus call to prevent race conditions
    const checkIdRef = import.meta.env.DEV ? { current: 0 } : { current: 0 };
    // Actually just use a normal ref
    const lastCheckId = useState(() => ({ count: 0 }))[0];

    // Function to check if the current user exists in the admin_profiles table
    const checkAdminStatus = async (userId: string) => {
        const thisCheckId = ++lastCheckId.count;

        try {
            const { data, error } = await supabase
                .from("admin_profiles")
                .select("*")
                .eq("id", userId)
                .single();

            // If a newer check has started, ignore this one
            if (thisCheckId !== lastCheckId.count) return;

            if (error) {
                // Handle specific error cases
                if (error.code === 'PGRST116') { // Not found
                    console.log("User not found in admin_profiles.");
                    setIsAdmin(false);
                } else if (error.message?.includes('AbortError') || error.message?.includes('Lock broken')) {
                    console.warn("Check aborted, waiting for next one...");
                    return;
                } else if (error.message?.includes('TypeError: Failed to fetch') || error.message?.includes('net::ERR_INTERNET_DISCONNECTED')) {
                    console.warn("Connection lost. Retrying when online...");
                    setIsAdmin(false);
                } else {
                    console.error("Auth status error:", error.message);
                    setIsAdmin(false);
                }
            } else if (data) {
                console.log("User IS an admin!");
                setIsAdmin(true);
            }
        } catch (e: any) {
            if (e.name === 'AbortError' || e.message?.includes('AbortError')) {
                return;
            }
            if (e.message?.includes('Failed to fetch') || e.message?.includes('network')) {
                console.warn("Network error during admin check. Check connection.");
            } else {
                console.error("Exception checking admin status:", e);
            }
            setIsAdmin(false);
        } finally {
            if (thisCheckId === lastCheckId.count) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        let mounted = true;

        async function initializeAuth() {
            try {
                // 1. Get initial session
                const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();

                if (!mounted) return;

                if (sessionError) {
                    console.error("Session fetch error:", sessionError);
                }

                if (initialSession) {
                    setSession(initialSession);
                    setUser(initialSession.user);
                    await checkAdminStatus(initialSession.user.id);
                } else {
                    setLoading(false);
                }

                // 2. Setup listener for future changes
                const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
                    console.log("Auth event fired:", event, "User:", currentSession?.user?.id);

                    if (!mounted) return;

                    if (event === 'SIGNED_OUT') {
                        setSession(null);
                        setUser(null);
                        setIsAdmin(false);
                        setLoading(false);
                        return;
                    }

                    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
                        setSession(currentSession);
                        setUser(currentSession?.user ?? null);

                        if (currentSession?.user) {
                            setLoading(true);
                            await checkAdminStatus(currentSession.user.id);
                        }
                    } else if (!currentSession) {
                        setIsAdmin(false);
                        setLoading(false);
                    }
                });

                return () => {
                    subscription.unsubscribe();
                };
            } catch (error) {
                console.error("Auth initialization error:", error);
                if (mounted) setLoading(false);
            }
        }

        initializeAuth();

        return () => {
            mounted = false;
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, isAdmin, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
