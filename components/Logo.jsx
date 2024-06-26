import { Instagram } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

function Logo() {
  return (
    <Link
      href={"/dashbord"}
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-3 lg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <Instagram className="h-6 w-6 shrink-0 lg:hidden" />
      <p className={`font-semibold text-xl hidden lg:block font`}>ShareScape</p>
    </Link>
  );
}

export default Logo;
