/** Direction-aware arrow (mirrors in RTL via the .arrow class). */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 12" width="20" height="12" className={`arrow shrink-0 ${className}`} fill="none">
      <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
