"use client";

import {
  Clapperboard,
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
  UserRound
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/dashbord", icon: Home },
  {
    name: "Search",
    href: "/dashbord/search",
    icon: Search,
    hideOnMobile: true,
  },
  { name: "My Profile", href: "/dashbord/profile", icon: UserRound },
  {
    name: "Reels",
    href: "/dashbord/reels",
    icon: Clapperboard,
  },
  {
    name: "Messages",
    href: "/dashbord/messages",
    icon: MessageCircle,
  },
  {
    name: "Notifications",
    href: "/dashbord/notifications",
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: "Create",
    href: "/dashbord/create",
    icon: PlusSquare,
  },
];

function NavLink() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}

export default NavLink;
