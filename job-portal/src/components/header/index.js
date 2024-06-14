"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify, Moon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

function Header({ user, profileInfo }) {
  const { theme, setTheme } = useTheme();
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Home",
      path: "/",
      show: true,
    },
  ];
  return (
    <header className="flex h-16 w-full shrink-0 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden">
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">Toggle Navigation Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link className="mr-6 hidden lg:flex" href={"#"}>
            <h3>JOBPORT</h3>
          </Link>
          <div className="grid gap-2 py-6">
            {menuItems.map((menuItem, index) =>
              menuItem.show ? (
                <Link
                  key={index}
                  href={menuItem.path}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  {menuItem.label}
                </Link>
              ) : null
            )}

            <Moon
              className="cursor-pointer mb-4"
              fill={theme === "dark" ? "light" : "dark"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <UserButton afterSignOutUrl="/" />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Header;
