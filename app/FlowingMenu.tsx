"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import "./flowing-menu.css";

type FlowingMenuItem = {
  link: string;
  text: string;
  description: string;
  image: string;
  imageAlt: string;
};

type FlowingMenuProps = {
  items: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

export default function FlowingMenu({
  items,
  speed = 15,
  textColor = "var(--ink)",
  bgColor = "transparent",
  marqueeBgColor = "var(--ink)",
  marqueeTextColor = "#fff",
  borderColor = "var(--line)",
}: FlowingMenuProps) {
  return (
    <div className="flowing-menu" style={{
      "--fm-text": textColor,
      "--fm-bg": bgColor,
      "--fm-preview-bg": marqueeBgColor,
      "--fm-preview-text": marqueeTextColor,
      "--fm-border": borderColor,
    } as CSSProperties}>
      {items.map((item) => <MenuItem key={item.text} item={item} speed={speed} />)}
    </div>
  );
}

// Adapted from React Bits FlowingMenu; motion runs only during interaction.
function MenuItem({ item, speed }: { item: FlowingMenuItem; speed: number }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const wipeRef = useRef<gsap.core.Timeline | null>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const activeRef = useRef(false);
  const staticRef = useRef(false);
  const [repetitions, setRepetitions] = useState(4);
  const descriptionId = useId();

  useLayoutEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    const part = track?.querySelector<HTMLElement>(".fm-part");
    if (!band || !track || !part) return;
    let disposed = false;
    const staticMedia = window.matchMedia("(max-width: 600px), (prefers-reduced-motion: reduce), (hover: none)");
    staticRef.current = staticMedia.matches;

    const context = gsap.context(() => {
      gsap.set(previewRef.current, { y: 0, yPercent: activeRef.current ? 0 : 101 });
      gsap.set(counterRef.current, { y: 0, yPercent: activeRef.current ? 0 : -101 });
    }, band);

    const measure = () => {
      if (disposed || !part.offsetWidth) return;
      const width = part.offsetWidth;
      setRepetitions(Math.max(2, Math.ceil(band.clientWidth / width) + 1));
      context.add(() => {
        loopRef.current?.kill();
        gsap.set(track, { x: 0 });
        loopRef.current = gsap.to(track, {
          x: -width,
          duration: Math.max(1, speed),
          repeat: -1,
          ease: "none",
          paused: !activeRef.current || staticRef.current,
        });
      });
    };

    const stop = () => {
      hoveredRef.current = false;
      focusedRef.current = false;
      activeRef.current = false;
      wipeRef.current?.kill();
      loopRef.current?.pause();
      gsap.set(previewRef.current, { yPercent: 101 });
      gsap.set(counterRef.current, { yPercent: -101 });
    };

    const updateMotion = () => {
      staticRef.current = staticMedia.matches;
      if (staticMedia.matches) stop();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(band);
    resizeObserver.observe(part);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    visibilityObserver.observe(band);
    staticMedia.addEventListener("change", updateMotion);
    measure();
    void document.fonts.ready.then(measure);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      staticMedia.removeEventListener("change", updateMotion);
      wipeRef.current?.kill();
      loopRef.current?.kill();
      context.revert();
    };
  }, [item.text, item.image, speed, repetitions]);

  const reveal = (show: boolean, edge: "top" | "bottom" = "top") => {
    if (staticRef.current || !previewRef.current || !counterRef.current) return;
    const wasActive = activeRef.current;
    activeRef.current = show;
    wipeRef.current?.kill();
    const offset = edge === "top" ? -101 : 101;
    const timeline = gsap.timeline({ defaults: { duration: 0.5, ease: "expo.out" } });

    if (show) {
      if (!wasActive) {
        timeline.set(previewRef.current, { yPercent: offset }, 0);
        timeline.set(counterRef.current, { yPercent: -offset }, 0);
      }
      loopRef.current?.play();
      timeline.to([previewRef.current, counterRef.current], { yPercent: 0 }, 0);
    } else {
      timeline.to(previewRef.current, { yPercent: offset }, 0);
      timeline.to(counterRef.current, { yPercent: -offset }, 0);
      timeline.eventCallback("onComplete", () => { loopRef.current?.pause(); });
    }
    wipeRef.current = timeline;
  };

  const closestEdge = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientY - rect.top < rect.height / 2 ? "top" : "bottom";
  };

  return (
    <article className="fm-item">
      <div
        ref={bandRef}
        className="fm-band"
        onPointerEnter={(event) => {
          if (event.pointerType === "touch") return;
          hoveredRef.current = true;
          reveal(true, closestEdge(event));
        }}
        onPointerLeave={(event) => {
          hoveredRef.current = false;
          if (!focusedRef.current) reveal(false, closestEdge(event));
        }}
      >
        <h3 className="fm-heading">
          <a
            className="fm-link"
            href={item.link}
            aria-describedby={descriptionId}
            onFocus={(event) => {
              focusedRef.current = event.currentTarget.matches(":focus-visible");
              if (focusedRef.current) reveal(true);
            }}
            onBlur={() => {
              focusedRef.current = false;
              if (!hoveredRef.current) reveal(false);
            }}
          >
            <Image className="fm-static-image" src={item.image} alt={item.imageAlt} width={208} height={100} sizes="104px" />
            <span>{item.text}</span>
            <ArrowUpRight className="fm-arrow" size={24} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </h3>
        <div ref={previewRef} className="fm-preview" aria-hidden="true">
          <div ref={counterRef} className="fm-counter">
            <div ref={trackRef} className="fm-track">
              {Array.from({ length: repetitions }, (_, index) => (
                <div className="fm-part" key={index}>
                  <span>{item.text}</span>
                  <Image src={item.image} alt="" width={208} height={100} sizes="208px" className="fm-image" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p id={descriptionId} className="fm-description">{item.description}</p>
    </article>
  );
}
