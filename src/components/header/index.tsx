import { Home, UtensilsCrossed } from "lucide-react";

import Logo from "@/assets/logo";

import NavLink from "./nav-link";
import AccountMenu from "../account-menu";
import { ThemeToggle } from "../theme/theme-toggle";
import { Separator } from "../ui/separator";

export default function Header() {
  return (
    <div className="border-bottom">
      <div className="flex items-center h-16 gap-6 px-6 border-b-[1px]">
        <Logo className="w-8 h-8" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/orders">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Orders</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <AccountMenu />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
