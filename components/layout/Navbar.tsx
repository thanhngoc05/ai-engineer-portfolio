"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ResumeLink } from "@/components/ui/ResumeLink";
import { navItems } from "@/data/profile";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <nav className="navbar__inner" aria-label="Primary navigation">
        <a className="navbar__brand" href="#home" aria-label="Thanh AI Engineer home">
          Thanh<span>.AI.engineer</span>
        </a>

        <div className="navbar__links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="navbar__resume">
          <ResumeLink className="navbar__resume-button" compact>
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </ResumeLink>
        </div>

        <button
          type="button"
          className="navbar__menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu__index">
          INDEX / 01—0{navItems.length}
        </div>
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
