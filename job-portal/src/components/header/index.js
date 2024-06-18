import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

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
            <div className="mr-6 hidden lg:flex">
              <div className="grid gap-2 py-6">
                {menuItems.map((menuItem, index) =>
                  menuItem.show ? (
                    <Link key={index} href={menuItem.path}>
                      {/* Use a div or span inside the Link */}
                      <div className="flex w-full items-center py-2 text-lg hover:font-semibold">
                        {menuItem.label}
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}

export default Header;
