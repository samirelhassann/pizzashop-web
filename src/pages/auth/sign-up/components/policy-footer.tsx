import { Link } from "react-router-dom";

export default function PolicyFooter() {
  return (
    <p className="px-6 text-sm leading-relaxed text-center text-muted-foreground">
      By creating an account, you agree to the{" "}
      <Link to="/terms" className="text-primary">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link to="/privacy" className="text-primary">
        Privacy Policy
      </Link>
    </p>
  );
}
