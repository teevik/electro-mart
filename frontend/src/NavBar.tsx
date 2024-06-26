import { useLocation, useRoute } from "wouter";
import {
  Bars3Icon,
  BellIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Link } from "./components/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "./components/button";
import clsx from "clsx";
import { useAuth } from "./state/auth";
import { useEffect, useState } from "react";
import { Input } from "./components/input";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}
function MobileNavLink(props: NavLinkProps) {
  const { href, children } = props;

  const [matches] = useRoute(href);

  return (
    <Disclosure.Button
      as={Link}
      href={href}
      className={clsx(
        matches
          ? "border-indigo-500 bg-indigo-50 text-gray-700"
          : "border-transparent text-gray-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-gray-800",
        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
      )}
      aria-current={matches ? "page" : undefined}
    >
      {children}
    </Disclosure.Button>
  );
}

function DesktopNavLink(props: NavLinkProps) {
  const { href, children } = props;

  const [matches] = useRoute(href);

  return (
    <Link
      href={href}
      className={clsx(
        matches
          ? "border-indigo-600 text-gray-900"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
      )}
      aria-current={matches ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

const navigation = [
  { href: "/", label: <>Products</> },
  { href: "/categories", label: <>Categories</> },
  { href: "/brands", label: <>Brands</> },
];

function LeftSide() {
  return (
    <div className="flex">
      <Link href="/" className="flex flex-shrink-0 items-center">
        <img className="block h-8 w-auto" src="/icon.png" alt="Electro Mart" />
      </Link>
      <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
        {navigation.map(({ href, label }) => (
          <DesktopNavLink key={href} href={href}>
            {label}
          </DesktopNavLink>
        ))}
      </div>
    </div>
  );
}

interface UserMenuLinkProps {
  href: string;
  children: React.ReactNode;
}

function DesktopUserMenuLink(props: UserMenuLinkProps) {
  const { href, children } = props;

  return (
    <MenuItem>
      {({ focus }) => (
        <Link
          href={href}
          className={clsx(
            focus ? "bg-gray-100" : "",
            "block px-4 py-2 text-sm text-gray-700"
          )}
        >
          {children}
        </Link>
      )}
    </MenuItem>
  );
}

function MobileUserMenuLink(props: UserMenuLinkProps) {
  const { href, children } = props;

  return (
    <DisclosureButton
      as={Link}
      href={href}
      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    >
      {children}
    </DisclosureButton>
  );
}

interface UserMenuButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function DesktopUserMenuButton(props: UserMenuButtonProps) {
  const { onClick, children } = props;

  return (
    <MenuItem>
      {({ focus }) => (
        <button
          onClick={onClick}
          className={clsx(
            focus ? "bg-gray-100" : "",
            "block w-full text-left px-4 py-2 text-sm text-gray-700"
          )}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
}

function MobileUserMenuButton(props: UserMenuButtonProps) {
  const { onClick, children } = props;

  return (
    <DisclosureButton
      onClick={onClick}
      className="block text-left w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    >
      {children}
    </DisclosureButton>
  );
}

function LoggedIn() {
  const { signOut } = useAuth();

  return (
    <>
      <Link
        href="/cart"
        className="relative flex max-w-xs items-center rounded-full bg-white text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open shopping cart</span>
        <ShoppingCartIcon className="h-8 w-8 rounded-full" />
      </Link>

      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <UserIcon className="h-8 w-8 rounded-full" />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <DesktopUserMenuLink href="/account">Account</DesktopUserMenuLink>
            <DesktopUserMenuLink href="/orders">Orders</DesktopUserMenuLink>
            <DesktopUserMenuButton onClick={signOut}>
              Sign out
            </DesktopUserMenuButton>
          </MenuItems>
        </Transition>
      </Menu>
    </>
  );
}

function LoggedOut(props: NavbarProps) {
  const { onClickLogin, onClickSignup } = props;

  return (
    <>
      <Button plain onClick={onClickLogin}>
        Log In
      </Button>
      <Button onClick={onClickSignup}>Sign Up</Button>
    </>
  );
}

function RightSide(props: NavbarProps) {
  const { onClickLogin, onClickSignup } = props;

  const { isLoggedIn } = useAuth();

  return (
    <div className="hidden sm:ml-6 sm:flex items-center gap-2">
      {isLoggedIn ? (
        <LoggedIn />
      ) : (
        <LoggedOut onClickLogin={onClickLogin} onClickSignup={onClickSignup} />
      )}
    </div>
  );
}

interface NavbarProps {
  onClickLogin: () => void;
  onClickSignup: () => void;
}

export function NavBar(props: NavbarProps) {
  let { onClickLogin, onClickSignup } = props;

  const { signOut, isLoggedIn } = useAuth();

  const [search, setSearch] = useState("");
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (search) {
      setLocation(`/search/${search}`);
    }
  }, [search]);

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 border-b border-gray-200 bg-white z-10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <LeftSide />

              <Input
                className="max-w-sm grow"
                placeholder="Search"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />

              <RightSide
                onClickLogin={onClickLogin}
                onClickSignup={onClickSignup}
              />
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map(({ href, label }) => (
                <MobileNavLink key={href} href={href}>
                  {label}
                </MobileNavLink>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {isLoggedIn && (
                <>
                  <div className="mt-3 space-y-1">
                    <MobileUserMenuLink href="/cart">
                      Shopping cart
                    </MobileUserMenuLink>

                    <MobileUserMenuLink href="/account">
                      Account
                    </MobileUserMenuLink>
                    <MobileUserMenuLink href="/orders">
                      Orders
                    </MobileUserMenuLink>
                    <MobileUserMenuButton onClick={signOut}>
                      Sign out
                    </MobileUserMenuButton>
                  </div>
                </>
              )}

              {!isLoggedIn && (
                <div className="flex gap-4 px-3">
                  <Button plain onClick={onClickLogin}>
                    Log In
                  </Button>
                  <Button onClick={onClickSignup}>Sign Up</Button>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
