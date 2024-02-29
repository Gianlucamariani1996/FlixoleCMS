import Head from "next/head";
import { SEO } from "../../../types";

export default function HeadInfo({ seo }: { seo: SEO }) {
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={seo.ogImage} />
    </Head>
  );
}
