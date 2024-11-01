import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function NavMenu() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 bg-white shadow-md">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            {["Jobs", "About", "Messages", "Notifications"].map((item) => (
              <Link
                href="#"
                key={item}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                {item}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <span className="sr-only">Acme Inc</span>
      </Link>

      <nav className="hidden lg:flex gap-6 mr-auto">
        {["Jobs", "About Us", "Messages", "Notifications"].map((link) => (
          <Link
            key={link}
            href="#"
            className="text-gray-800 font-medium transition-colors hover:text-blue-500"
            prefetch={false}
          >
            {link}
          </Link>
        ))}
      </nav>

      <div className="relative hidden lg:flex items-center ml-auto">
        <input
          type="text"
          placeholder="Search."
          className="w-48 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative hidden lg:flex items-center ml-4">
        <button
          onClick={() => setShowAccountDropdown(!showAccountDropdown)}
          className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
        >
          Account
          <DropdownIcon className="ml-2 h-4 w-4 text-gray-600" />
        </button>
        {showAccountDropdown && (
          <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <Link
              href="/logout"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function DropdownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
