
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-sunny-yellow-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600 font-comic">
              © 2024 Kreatives für Kinder. Mit Liebe gemacht für kleine Künstler! 🎨
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link
              to="/impressum"
              className="text-gray-600 hover:text-sunny-yellow-600 font-comic transition-colors"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              className="text-gray-600 hover:text-sunny-yellow-600 font-comic transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-sky-blue-500 hover:text-sky-blue-600 transition-colors text-sm font-comic"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 LinkedIn
            </a>
            <a
              href="#"
              className="text-rose-pink-500 hover:text-rose-pink-600 transition-colors text-sm font-comic"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
