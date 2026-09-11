"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import "./staggered-menu.css";

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

type StaggeredMenuProps = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

const defaultColors = ["#262262", "#d71920"];

// Adapted from React Bits StaggeredMenu: layered drawer and masked item reveals.
export default function StaggeredMenu({
  position = "right",
  colors = defaultColors,
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = "",
  logoUrl = "/assets/a1-outdoor-logo.jpg",
  menuButtonColor = "#fff",
  openMenuButtonColor = "#090909",
  accentColor = "#d71920",
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotionRef = useRef(false);
  const panelId = useId();
  const titleId = useId();

  const closeMenu = useCallback(() => {
    setOpen(false);
    onMenuClose?.();
  }, [onMenuClose]);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useLayoutEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches && timelineRef.current?.isActive()) {
        const timeline = timelineRef.current;
        timeline.progress(timeline.reversed() ? 0 : 1).pause();
      }
    };
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    const context = gsap.context(() => {
      const root = rootRef.current;
      const panel = panelRef.current;
      const drawer = drawerRef.current;
      if (!root || !panel || !drawer) return;

      const layers = root.querySelectorAll(".sm-prelayer");
      const labels = root.querySelectorAll(".sm-panel-itemLabel");
      const numbers = root.querySelectorAll(".sm-panel-number");
      const details = root.querySelectorAll(".sm-panel-title, .sm-socials");
      gsap.set([panel, ...layers], { x: 0, xPercent: position === "left" ? -100 : 100 });
      gsap.set(labels, { yPercent: 125, rotate: 5 });
      gsap.set([...numbers, ...details], { opacity: 0 });

      const timeline = gsap.timeline({
        paused: true,
        onReverseComplete: () => { gsap.set(drawer, { autoAlpha: 0 }); },
      });
      timeline.to(".sm-backdrop", { opacity: 1, duration: 0.35 }, 0);
      layers.forEach((layer, index) => {
        timeline.to(layer, { xPercent: 0, duration: 0.5, ease: "power4.out" }, index * 0.07);
      });
      const panelStart = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
      timeline.to(panel, { xPercent: 0, duration: 0.65, ease: "power4.out" }, panelStart);
      timeline.to(labels, {
        yPercent: 0, rotate: 0, duration: 0.65, stagger: 0.065, ease: "power4.out",
      }, panelStart + 0.13);
      timeline.to(numbers, { opacity: 1, duration: 0.35, stagger: 0.065 }, panelStart + 0.2);
      timeline.to(details, { opacity: 1, duration: 0.4 }, panelStart + 0.25);
      timelineRef.current = timeline;
    }, rootRef);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      context.revert();
      timelineRef.current = null;
    };
  }, [position]);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (open) {
      const scrollArea = panelRef.current?.querySelector(".sm-panel-inner");
      if (scrollArea) scrollArea.scrollTop = 0;
      gsap.set(drawerRef.current, { autoAlpha: 1 });
      if (reducedMotionRef.current) timeline.progress(1).pause();
      else timeline.timeScale(1).play();
    } else if (reducedMotionRef.current || timeline.progress() === 0) {
      timeline.progress(0).pause();
      gsap.set(drawerRef.current, { autoAlpha: 0 });
    } else {
      timeline.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const root = rootRef.current;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    if (!root || !panel || !toggle) return;

    // Keep the underlying page out of the tab order while the drawer is open.
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(root));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    panel.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
      if (event.key !== "Tab") return;
      const controls = [toggle, ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      const currentIndex = controls.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? controls.length - 1 : currentIndex - 1)
        : (currentIndex + 1) % controls.length;
      event.preventDefault();
      controls[nextIndex].focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      toggle.focus({ preventScroll: true });
    };
  }, [open, closeMenu]);

  const handleToggle = () => {
    if (open) closeMenu();
    else {
      setOpen(true);
      onMenuOpen?.();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`staggered-menu-wrapper ${className}`}
      data-position={position}
      data-open={open || undefined}
      data-scrolled={scrolled || undefined}
      style={{
        "--sm-accent": accentColor,
        "--sm-toggle-color": menuButtonColor,
        "--sm-toggle-open-color": changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
      } as CSSProperties}
    >
      <header className="staggered-menu-header" aria-label="Primary navigation">
        <a className="sm-logo" href="#top" aria-label="A1 Outdoor home" onClick={closeMenu} inert={open}>
          <Image src={logoUrl} alt="A1 Outdoor" className="sm-logo-img" width={400} height={167} priority unoptimized />
        </a>
        <button
          ref={toggleRef}
          className="sm-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          title={open ? "Close menu" : "Open menu"}
          onClick={handleToggle}
        >
          <span className="sm-toggle-icon" aria-hidden="true">
            <Menu className="sm-hamburger" size={28} strokeWidth={1.6} />
            <X className="sm-close-icon" size={28} strokeWidth={1.6} />
          </span>
        </button>
      </header>

      <div ref={drawerRef} className="sm-drawer">
        <div className="sm-backdrop" aria-hidden="true" onClick={closeOnClickAway ? closeMenu : undefined} />
        <div className="sm-prelayers" aria-hidden="true">
          {(colors.length ? colors : defaultColors).slice(0, 4).map((color, index) => (
            <div key={`${color}-${index}`} className="sm-prelayer" style={{ background: color }} />
          ))}
        </div>
        <aside
          id={panelId}
          ref={panelRef}
          className="staggered-menu-panel"
          role="dialog"
          aria-modal={open || undefined}
          aria-labelledby={titleId}
          aria-hidden={!open}
          inert={!open}
          tabIndex={-1}
        >
          <div className="sm-panel-inner">
            <nav aria-label="Main navigation">
              <p className="sm-panel-title" id={titleId}>Explore A1 Outdoor</p>
              <ul className="sm-panel-list">
                {items.map((item, index) => (
                  <li className="sm-panel-itemWrap" key={item.label}>
                    <a className="sm-panel-item" href={item.link} aria-label={item.ariaLabel} onClick={closeMenu}>
                      <span className="sm-panel-labelMask">
                        <span className="sm-panel-itemLabel">{item.label}</span>
                      </span>
                      {displayItemNumbering && <span className="sm-panel-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials" aria-label="Contact links">
                <p className="sm-socials-title">Get in touch</p>
                <ul className="sm-socials-list">
                  {socialItems.map((social) => (
                    <li key={social.label}>
                      <a href={social.link} className="sm-socials-link" onClick={closeMenu}>{social.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
