"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";

interface ILoggedin {
  logout: () => void;
}

function Loggedin({ logout }: ILoggedin) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        render={
          <Link href="/" onClick={logout}>
            Logout
          </Link>
        }
      />
    </NavigationMenuItem>
  );
}

function Loggedout() {
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          render={<Link href="/login">Login</Link>}
        />
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          render={<Link href="/register">Register</Link>}
        />
      </NavigationMenuItem>
    </>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <NavigationMenu className="py-2 px-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/">Home</Link>}
          />
        </NavigationMenuItem>
        {user ? <Loggedin logout={logout} /> : <Loggedout />}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
