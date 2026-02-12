"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // --- Lenis smooth scroll ---
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Set GSAP defaults for 60fps
    gsap.defaults({ force3D: true, ease: "power3.out" });

    // --- Navbar fade-in (links + icons only) ---
    gsap.from(".navbar__links", {
      opacity: 0,
      y: -10,
      duration: 0.8,
      delay: 0.6,
    });
    gsap.from(".navbar__icons", {
      opacity: 0,
      y: -10,
      duration: 0.8,
      delay: 0.7,
    });

    // --- Logo: natural scroll effect ---
    // Logo appears with hero, scrolls up naturally, fades out cleanly.
    const logo = document.querySelector(".navbar__logo") as HTMLElement;
    if (logo) {
      // Scroll: position rises over full hero, opacity fades in first 55%
      const logoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-grid",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      logoTl
        .to(logo, { y: "-45vh", ease: "none", duration: 1 }, 0)
        .to(logo, { opacity: 0, ease: "power1.in", duration: 0.55 }, 0);
    }

    // --- Hero images: simple fade-in ---
    gsap.from(".hero-grid", {
      opacity: 0,
      duration: 1.2,
      delay: 0.1,
      ease: "power2.out",
    });

    // --- Hero cinematic exit: unified blur + darken ---
    // Delayed start so hero stays crisp during logo rise phase
    gsap.to(".hero-grid__layer", {
      filter: "blur(12px)",
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-grid",
        start: "top 65%",
        end: "top 10%",
        scrub: 1,
      },
    });
    gsap.to(".hero-grid__overlay", {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      ease: "none",
      scrollTrigger: {
        trigger: ".product-grid",
        start: "top 65%",
        end: "top 10%",
        scrub: 1,
      },
    });

    // --- Navbar color change: dark text over light sections ---
    ScrollTrigger.create({
      trigger: ".product-grid",
      start: "top 60px",
      end: "bottom 60px",
      onEnter: () =>
        document.querySelector(".navbar")?.classList.add("navbar--dark"),
      onLeave: () =>
        document.querySelector(".navbar")?.classList.remove("navbar--dark"),
      onEnterBack: () =>
        document.querySelector(".navbar")?.classList.add("navbar--dark"),
      onLeaveBack: () =>
        document.querySelector(".navbar")?.classList.remove("navbar--dark"),
    });

    // --- Product grid: title + subtitle slide-up ---
    gsap.from(".product-grid__title", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product-grid__header",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    gsap.from(".product-grid__subtitle", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product-grid__header",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // --- Product grid: single fade-up for the whole grid ---
    gsap.from(".product-grid__items", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product-grid__items",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
