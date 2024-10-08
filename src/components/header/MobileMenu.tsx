"use client";

import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavLinks, UserNavLinks } from "@/constants";
import BurgerButton from "./BurgerButton";

const MobileMenu = () => {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger>
        <BurgerButton />
      </PopoverTrigger>
      <PopoverContent className="w-auto mr-2">
        <ul className="flex flex-col gap-2">
          {session?.user
            ? UserNavLinks.map((link) => (
                <a href={link.href} key={link.key}>
                  {link.text}
                </a>
              ))
            : null}
          {NavLinks.map((link) => (
            <a href={link.href} key={link.key}>
              {link.text}
            </a>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MobileMenu;
