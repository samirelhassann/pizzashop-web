/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import FullPizza from "@/assets/full-pizza";
import { Separator } from "@/components/ui/separator";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <div className="flex items-center justify-center gap-4">
        <span className="font-bold tracking-tighter text-9xl">4</span>
        <FullPizza className="w-28 h-28" />
        <span className="font-bold tracking-tighter text-9xl">4</span>
      </div>

      <span className="text-xl tracking-tight text-muted-foreground">
        Page not found
      </span>

      <Separator className="w-[500px]" />

      <p className="text-xl text-muted-foreground max-w-[600px] text-center">
        Sorry, we couldn't find the page you were looking for. But you can find
        a plenty of other things on our
        <Link to="/" className="ml-1 text-primary">
          homepage
        </Link>
        .
      </p>
    </div>
  );
}
