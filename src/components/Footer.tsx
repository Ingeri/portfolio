export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      header: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      header: "Socials",
      links: [
        { label: "GitHub", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Twitter", href: "#" },
      ],
    },
    {
      header: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-5 mb-12">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 dark:text-white">
              INGERI<span className="text-blue-600">.</span>
            </h2>
            <p className="text-sm leading-7 text-slate-600 max-w-xs dark:text-slate-400">
              Building interactive web experiences and scalable software with React, Next.js, and modern architecture.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 transition-smooth hover-lift dark:border-slate-700 dark:hover:bg-slate-800">
                <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 transition-smooth hover-lift dark:border-slate-700 dark:hover:bg-slate-800">
                <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.439-.103.25-.129.599-.129.948v5.418h-3.554s.036-8.789 0-9.701h3.554v1.375c.425-.654 1.184-1.586 2.882-1.586 2.107 0 3.686 1.378 3.686 4.338v5.574zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.771-1.704 1.956-1.704 1.184 0 1.914.753 1.915 1.704 0 .946-.771 1.704-1.915 1.704zm1.654 11.597h-3.308v-9.701h3.308v9.701zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.729C24 .774 23.204 0 22.225 0z" />
                </svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 transition-smooth hover-lift dark:border-slate-700 dark:hover:bg-slate-800">
                <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 3.96 3.96 0 01-1.211 1.666 1.975 1.975 0 00-.766.566c1.312-.588 2.474-1.504 3.32-2.704a7.02 7.02 0 01-1.98.738c-.58-.59-1.48-1.05-2.471-1.05-1.87 0-3.378 1.508-3.378 3.378 0 .265.032.525.095.773A9.957 9.957 0 012.17 1.995a3.974 3.974 0 011.044 5.365 3.966 3.966 0 01-1.53-.42v.05c0 1.634 1.163 2.994 2.704 3.299-.283.077-.582.12-.89.12-.217 0-.43-.02-.636-.06.43 1.35 1.68 2.332 3.158 2.358A7.968 7.968 0 012 18.77a10.008 10.008 0 005.434 1.594c6.521 0 10.084-5.403 10.084-10.084 0-.154-.004-.307-.012-.459.693-.502 1.295-1.13 1.77-1.847z" />
                </svg>
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.header}>
              <h3 className="font-semibold text-slate-900 mb-4 dark:text-white">{section.header}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-600 hover:text-blue-600 transition-smooth dark:text-slate-400 dark:hover:text-blue-400">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-8 dark:border-slate-700">
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              &copy; {currentYear} Ingeri. All rights reserved.
            </p>
            <div className="flex gap-4 md:justify-end">
              <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-smooth dark:text-slate-400 dark:hover:text-blue-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-smooth dark:text-slate-400 dark:hover:text-blue-400">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}