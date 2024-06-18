"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify } from "lucide-react";

function Header() {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: true,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: true,
    },
  ];
  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href={"#"}>
              <h3>Job Portal</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((menuItem, index) => {
                if (menuItem.show) {
                  return (
                    <Link
                      key={index}
                      href={menuItem.path}
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      {menuItem.label}
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}

export default Header;
