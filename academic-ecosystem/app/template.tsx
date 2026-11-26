/** A short fade on every route change (disabled for reduced motion in CSS). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
