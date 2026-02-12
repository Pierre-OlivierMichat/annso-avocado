"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 5.25V3.5C14 1.56712 12.4329 0 10.5 0C8.56712 0 7 1.56712 7 3.5V5.25H2.625V21H18.375V5.25H14ZM7.875 3.5C7.875 2.05275 9.05275 0.875 10.5 0.875C11.9473 0.875 13.125 2.05275 13.125 3.5V5.25H7.875V3.5ZM16.625 19.25H4.375V7H7V8.3125C7 8.554 7.196 8.75 7.4375 8.75C7.679 8.75 7.875 8.554 7.875 8.3125V7H13.125V8.3125C13.125 8.554 13.321 8.75 13.5625 8.75C13.804 8.75 14 8.554 14 8.3125V7H16.625V19.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

const navLinks = [
  { label: "HOMME" },
  { label: "FEMME" },
];

const linkHover = {
  rest: { opacity: 0.85 },
  hover: { opacity: 1 },
};

const linkTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner">
        <a href="#main-content" className="navbar__skip">
          Aller au contenu
        </a>

        {/* Left: Navigation links */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <motion.button
              key={link.label}
              className="navbar__link"
              initial="rest"
              whileHover="hover"
              variants={linkHover}
              transition={linkTransition}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* Center: Logo */}
        <a href="#" className="navbar__logo" aria-label="Annso Avocado — Accueil">
          <Image
            src="/images/logo.png"
            alt="Annso Avocado"
            width={120}
            height={93}
            priority
            unoptimized
          />
        </a>

        {/* Right: Icon buttons */}
        <div className="navbar__icons">
          <motion.button
            className="navbar__icon-btn"
            aria-label="Rechercher"
            initial="rest"
            whileHover="hover"
            variants={linkHover}
            transition={linkTransition}
          >
            <SearchIcon />
          </motion.button>
          <motion.button
            className="navbar__icon-btn"
            aria-label="Compte"
            initial="rest"
            whileHover="hover"
            variants={linkHover}
            transition={linkTransition}
          >
            <AccountIcon />
          </motion.button>
          <motion.button
            className="navbar__icon-btn navbar__icon-btn--cart"
            aria-label="Panier"
            initial="rest"
            whileHover="hover"
            variants={linkHover}
            transition={linkTransition}
          >
            <CartIcon />
          </motion.button>
        </div>
      </nav>
    </header>
  );
}
