import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

// Custom SVG Icons
const SparklesIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const MailIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MapPinIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const socialLinks = [
  {
    icon: <MailIcon className="h-4 w-4" />,
    href: "mailto:mohamedashraf22262@gmail.com",
    label: "Email",
  },
  {
    icon: <GithubIcon className="h-4 w-4" />,
    href: "https://github.com/MohamedAshraf-a",
    label: "GitHub",
    target: "_blank",
  },
  {
    icon: <LinkedinIcon className="h-4 w-4" />,
    href: "https://www.linkedin.com/in/mohamed-ashraf-99b754317/",
    label: "LinkedIn",
    target: "_blank",
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
];

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-xl">
      <div className="container-custom py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="rounded-xl p-2 gold-bg-light transition group-hover:scale-110">
                <SparklesIcon className="h-4 w-4 gold-text" />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  Mohamed Ashraf
                </h2>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Front-End Developer
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-muted-foreground)]">
              Modern E-Commerce platform built with React, Vite, Tailwind CSS,
              shadcn/ui and DummyJSON API. Designed and developed by Mohamed
              Ashraf.
            </p>

            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:gold-bg-light hover:gold-text transition-all"
                  asChild
                >
                  <a
                    href={social.href}
                    target={social.target || "_self"}
                    rel={
                      social.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest gold-text">
              Navigation
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--color-muted-foreground)] hover:gold-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest gold-text">
              Contact
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:mohamedashraf22262@gmail.com"
                  className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)] hover:gold-text transition-colors"
                >
                  <MailIcon className="h-4 w-4" />
                  mohamedashraf22262@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                <MapPinIcon className="h-4 w-4" />
                Alexandria, Egypt
              </li>

              <li className="text-sm font-medium gold-text">
                Available for Freelance & Full-Time
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-xs text-[var(--color-muted-foreground)]">
            © {new Date().getFullYear()} Mohamed Ashraf. All rights reserved.
          </p>

          <p className="text-xs text-[var(--color-muted-foreground)]">
            Built with React • Vite • Tailwind CSS • shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;