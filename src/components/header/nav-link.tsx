import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;

export default function NavLink({ to: linkTo, ...props }: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={linkTo}
      data-active={pathname === linkTo}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-primary data-[active=true]:font-semibold"
      {...props}
    />
  );
}
