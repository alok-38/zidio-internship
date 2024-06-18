"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";


function Header() {
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
	]

	return (
		<div>
			<header className="flex h-16 w-full shrink-0 items-center">
				<Sheet>
					<SheetTrigger asChild>
						<Button>
							<AlignJustify />
						</Button>
					</SheetTrigger>
				</Sheet>
			</header>
		</div>
	)
}
export default Header;