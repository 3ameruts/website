/** Re-mounts on every navigation: a short, calm page-enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
