import Image from "next/image";
import Link from "next/link";

/** Inner-page hero: navy chapter with optional photograph or ambient video. */
export function PageHero({
  title,
  body,
  image,
  video,
  crumbs,
  chapter,
  children,
}: {
  title: string;
  body?: string;
  image?: string;
  video?: { src: string; poster: string };
  crumbs?: { href: string; label: string }[];
  chapter?: string;
  children?: React.ReactNode;
}) {
  const media = Boolean(image || video);
  return (
    <section
      id="top"
      data-chapter={chapter}
      data-theme="dark"
      aria-labelledby="page-title"
      className={`on-dark relative isolate flex flex-col justify-end overflow-hidden bg-navy text-white ${media ? "min-h-[78svh] md:min-h-[86svh]" : "min-h-[56svh]"}`}
    >
      {image && <Image src={image} alt="" fill priority sizes="100vw" quality={70} className="-z-20 object-cover" />}
      {video && (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={video.poster}
          aria-hidden
          tabIndex={-1}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      )}
      {video && <Image src={video.poster} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />}
      {media && (
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(8_34_79/0.94)_0%,rgb(8_34_79/0.6)_40%,rgb(8_34_79/0.15)_75%)]" />
      )}
      <div className="frame grid-12 pb-16 pt-36 md:pb-24">
        <div className="col-span-4 md:col-span-9">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="t-small mb-6 text-white/75">
              <ol className="flex flex-wrap items-center gap-2">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.href} className="link">{c.label}</Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 id="page-title" className="t-display">
            {title}
          </h1>
          {body && <p className="t-lead mt-7 max-w-[56ch] text-white/85">{body}</p>}
          {children}
        </div>
      </div>
      <div className="band band-light" aria-hidden />
    </section>
  );
}
