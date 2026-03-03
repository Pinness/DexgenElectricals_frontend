import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
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

    // Use Ref to avoid obsolete state in async closures
    const checkCountRef = useRef(0);

    const checkAdminStatus = async (userId: string) => {
        const currentCheckId = ++checkCountRef.current;
        console.log(`[Auth] Checking admin status for ${userId} (Check ID: ${currentCheckId})`);

        try {
            // Add a race-condition-safe check for admin status
            // Use a promise with a timeout to prevent infinite hangs
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Admin check timed out")), 5000)
            );

            const fetchPromise = supabase
                .from("admin_profiles")
                .select("id")
                .eq("id", userId)
                .single();

            const result: any = await Promise.race([fetchPromise, timeoutPromise]);
            const { data, error } = result;

            // Silently discard if a newer check has started
            if (currentCheckId !== checkCountRef.current) return;

            if (error) {
                if (error.code === 'PGRST116') { // Not found
                    console.log("[Auth] User is not an admin.");
                    setIsAdmin(false);
                } else {
                    console.error("[Auth] Admin check error:", error.message);
                    setIsAdmin(false);
                }
            } else if (data) {
                console.log("[Auth] User verified as Admin.");
                setIsAdmin(true);
            }
        } catch (e: any) {
            console.error("[Auth] Exception in admin check:", e.message);
            setIsAdmin(false);
        } finally {
            if (currentCheckId === checkCountRef.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        let mounted = true;

        async function initializeAuth() {
            console.log("[Auth] Initializing authentication...");
            try {
                // 1. Get initial session
                const { data: { session: initialSession } } = await supabase.auth.getSession();

                if (!mounted) return;

                if (initialSession) {
                    setSession(initialSession);
                    setUser(initialSession.user);
                    await checkAdminStatus(initialSession.user.id);
                } else {
                    console.log("[Auth] No initial session found.");
                    setLoading(false);
                }

                // 2. Setup listener for future changes
                const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
                    console.log(`[Auth] Auth event: ${event}`);

                    if (!mounted) return;

                    if (event === 'SIGNED_OUT') {
                        setSession(null);
                        setUser(null);
                        setIsAdmin(false);
                        setLoading(false);
                        return;
                    }

                    if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
                        const newUser = currentSession?.user ?? null;

                        // Only trigger loading/check if the user actually changed or we aren't verified yet
                        if (newUser?.id !== user?.id || !isAdmin) {
                            setSession(currentSession);
                            setUser(newUser);
                            if (newUser) {
                                setLoading(true);
                                await checkAdminStatus(newUser.id);
                            } else {
                                setLoading(false);
                            }
                        }
                    }
                });

                return () => {
                    subscription.unsubscribe();
                };
            } catch (error) {
                console.error("[Auth] Initialization failed:", error);
                if (mounted) setLoading(false);
            }
        }

        initializeAuth();

        return () => {
            mounted = false;
        };
    }, [user?.id, isAdmin]); // Re-bind listener slightly more carefully if needed

    const signOut = async () => {
        setLoading(true);
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
