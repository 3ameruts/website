import { site } from "@/content/site";

/** Marks replaceable placeholder content. Disappears when site.demoMode is false. */
export function DemoTag({ label, className = "" }: { label: string; className?: string }) {
  if (!site.demoMode) return null;
  return (
    <span className={`demo-tag ${className}`}>
      <svg aria-hidden viewBox="0 0 8 8" width="8" height="8">
        <circle cx="4" cy="4" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      {label}
    </span>
  );
}
