"use client";

import { SheetTrigger, Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify, Link } from "lucide-react";

function Header() {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Feed",
      path: "/feed",
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
    {
      label: "Activity",
      path: "/activity",
      show: true,
    },
    {
      label: "Companies",
      path: "/companies",
      show: true,
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: true,
    },
    {
      label: "Membership",
      path: "/membership",
      show: true,
    },
    {
      label: "Account",
      path: "/account",
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
              {menuItems.map((menuItem, index) =>
                menuItem.show ? (
                  <Link
                    key={menuItem.label} // Use a unique identifier as the key
                    href={menuItem.path}
                    onClick={() => sessionStorage.removeItem("filterParams")}
                    className="group inline-flex h-9 w-max items-center rounded-md  px-4 py-2 text-sm font-medium"
                  >
                    {menuItem.label}
                  </Link>
                ) : null
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}

export default Header;
