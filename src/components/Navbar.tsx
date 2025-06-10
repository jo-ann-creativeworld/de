
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Start", path: "/" },
    { name: "Über mich", path: "/about" },
    { name: "Produkte", path: "/products" },
    { name: "Kunstprojekte", path: "/art-projects" },
    { name: "Kontakt", path: "/contact" },
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-sunny-yellow-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-fredoka font-bold text-sunny-yellow-600 hover:text-sunny-yellow-700 transition-colors">
                Kreatives für Kinder
              </h1>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-fredoka font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-sunny-yellow-600 bg-sunny-yellow-50"
                    : "text-gray-700 hover:text-sunny-yellow-600 hover:bg-sunny-yellow-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-sunny-yellow-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-sunny-yellow-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-fredoka font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-sunny-yellow-600 bg-sunny-yellow-50"
                      : "text-gray-700 hover:text-sunny-yellow-600 hover:bg-sunny-yellow-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
