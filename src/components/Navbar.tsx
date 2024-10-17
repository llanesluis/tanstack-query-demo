import { Link, useLocation } from "wouter";
import { cn } from "../lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { PanelLeft } from "lucide-react";

export default function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-10 border-b-2 bg-background/70 py-4 backdrop-blur">
      <div className="container flex items-center justify-between gap-4">
        <MobileNavbar />
        <Link
          href="/"
          className="text-gradient mr-auto inline-block text-xl font-bold"
        >
          TanStack Query{" "}
          <span className="align-top text-sm text-white">v5</span> demo
        </Link>
        <DesktopNavbar />
      </div>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <nav className="hidden justify-between gap-4 md:flex">
      <NavbarItem href="/query">query</NavbarItem>
      <NavbarItem href="/mutation">mutation</NavbarItem>
      <NavbarItem href="/optimistic-mutation">optimistic mutation</NavbarItem>
    </nav>
  );
}

function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <PanelLeft className="size-5" />
      </SheetTrigger>

      <SheetContent side={"left"} className="max-w-xs">
        <nav className="flex max-w-xs flex-col gap-8">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-xl font-bold text-transparent"
          >
            TanStack Query{" "}
            <span className="align-top text-sm text-white">v5</span> demo
          </Link>
          <div className="flex flex-col gap-4">
            <NavbarItem href="/query">query</NavbarItem>
            <NavbarItem href="/mutation">mutation</NavbarItem>
            <NavbarItem href="/optimistic-mutation">
              optimistic mutation
            </NavbarItem>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function NavbarItem({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [pathname] = useLocation();
  return (
    <Link
      href={href}
      className={cn(
        "font-semibold",
        pathname === href && "text-gradient",
        className,
      )}
    >
      {children}
    </Link>
  );
}
