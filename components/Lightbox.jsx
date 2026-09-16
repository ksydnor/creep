"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Lightbox({ media, activeIndex, onClose, onChange }) {
  const active = media[activeIndex];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  // caption is optional in the CMS, so the dialog name falls back to the alt text
  const label = active.caption || active.alt || "Project image";
  const showNext = useCallback(() => onChange((activeIndex + 1) % media.length), [activeIndex, media.length, onChange]);
  const showPrevious = useCallback(
    () => onChange((activeIndex - 1 + media.length) % media.length),
    [activeIndex, media.length, onChange]
  );

  // Runs once per open: the trigger element and the page scroll state must be
  // restored exactly as they were, even on an unexpected unmount.
  useEffect(() => {
    const trigger = document.activeElement;
    const { body } = document;
    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) {
        trigger.focus();
      }
    };
  }, []);

  useEffect(() => {
    function trapFocus(event) {
      const root = dialogRef.current;
      if (!root) {
        return;
      }

      const focusable = Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      const outside = !root.contains(current);

      if (event.shiftKey && (outside || current === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || current === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
      if (event.key === "Tab") {
        trapFocus(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, showNext, showPrevious]);

  return (
    <div aria-label={label} aria-modal="true" className="fixed inset-0 z-[80] flex flex-col bg-ink/95 p-5 text-paper" ref={dialogRef} role="dialog">
      <div className="flex items-center justify-between gap-5">
        <p className="text-xs uppercase tracking-exhibit text-bone/70">{active.caption}</p>
        <p aria-live="polite" className="sr-only">{`Image ${activeIndex + 1} of ${media.length}: ${label}`}</p>
        <button className="border border-white/20 px-4 py-2 text-xs uppercase tracking-exhibit hover:bg-paper hover:text-ink" onClick={onClose} ref={closeRef} type="button">
          Close
        </button>
      </div>
      <div className="relative mx-auto mt-5 min-h-0 w-full max-w-6xl flex-1">
        <Image alt={active.alt} className="object-contain" fill sizes="100vw" src={active.src} />
      </div>
      <div className="mx-auto mt-5 flex w-full max-w-6xl justify-between text-xs uppercase tracking-exhibit">
        <button onClick={showPrevious} type="button">
          Previous
        </button>
        <button onClick={showNext} type="button">
          Next
        </button>
      </div>
    </div>
  );
}
