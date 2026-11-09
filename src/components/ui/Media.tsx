import Image from "next/image";

/**
 * Editorial image block. `reveal` enables the "fill upward" entrance — use it
 * only on large editorial images, never on every card.
 */
export function Media({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  reveal = false,
  preload = false,
  ratio,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  reveal?: boolean;
  preload?: boolean;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gray ${reveal ? "fill-reveal" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={70}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
