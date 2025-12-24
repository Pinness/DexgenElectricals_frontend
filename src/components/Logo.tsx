import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  showText?: boolean;
  variant?: "default" | "light";
}

const Logo = ({
  className,
  textClassName,
  showText = true,
  variant = "default",
}: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/og-image.png"
        alt="Dexgen Electrical Solutions"
        className="h-10 w-auto object-contain rounded-md"
      />
      {showText && (
        <span
          className={cn(
            "font-bold text-xl leading-tight",
            variant === "light" ? "text-primary-foreground" : "text-primary",
            textClassName
          )}
        >
          DEXGEN <span className="hidden sm:inline">Electrical Solutions</span>
          <span className="sm:hidden">Engineering</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
