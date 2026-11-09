import { notFound } from "next/navigation";

/** Unknown paths inside a locale render the styled, localized-layout 404. */
export const dynamicParams = true;
export default function CatchAll() {
  notFound();
}
