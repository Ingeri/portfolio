export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { header: "Navigation", links: ["Home", "About", "Projects", "Contact"] },
    { header: "Socials", links: ["GitHub", "LinkedIn", "Twitter"] },
    { header: "Legal", links: ["Privacy Policy", "Terms of Service"] },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <h2 className="text-white text-xl font-bold tracking-tight mb-4">
              INGERI<span className="text-blue-500">.</span>
            </h2>
            <p className="max-w-xs text-sm leading-6">
              Building modern web experiences with React, Tailwind, and Supabase. 
              Focused on performance and clean code.
            </p>
          </div>

          {/* Dynamic Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.header}>
              <h3 className="text-white font-semibold mb-4">{section.header}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-gray-500">
          <p>&copy; {currentYear} Ingeri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}