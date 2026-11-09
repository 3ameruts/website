/** Section heading: title in the start columns, supporting text in the end columns. */
export function SectionHead({
  id,
  title,
  body,
  aside,
  className = "",
}: {
  id?: string;
  title: string;
  body?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid-12 gap-y-5 ${className}`}>
      <h2 id={id} className="t-h1 col-span-4 md:col-span-7">
        {title}
      </h2>
      {(body || aside) && (
        <div className="col-span-4 self-end md:col-span-4 md:col-start-9">
          {body && <p className="t-lead opacity-85">{body}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
