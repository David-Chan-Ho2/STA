import config from "@/config/config.json";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-lg font-semibold text-white">
              {config.name}
            </span>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Commercial HVAC
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Industrial Systems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Smart Buildings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Energy Management
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
