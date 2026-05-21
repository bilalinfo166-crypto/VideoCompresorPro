import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

type PlatformLandingPageProps = {
  platformName: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string; // path relative to /public
  ctaLink: string; // e.g., '/compress-mp4?format=tiktok'
};

export default function PlatformLandingPage({
  platformName,
  slug,
  title,
  description,
  heroImage,
  ctaLink,
}: PlatformLandingPageProps) {
  const pageTitle = `${title} | VideoCompressorPro`;
  const pageDescription = description;
  const pageUrl = `https://videocompressorpro.com/${slug}`;
  const ogImage = `https://videocompressorpro.com${heroImage}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <link rel="canonical" href={pageUrl} />
      </Head>
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] bg-black/20 backdrop-blur-lg p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400">
            {title}
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            {description}
          </p>
          <Link
            href={ctaLink}
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg transform transition hover:scale-105"
          >
            {`Start compressing for ${platformName}`}
          </Link>
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <Image
            src={heroImage}
            alt={`${platformName} hero`}
            fill
            style={{ objectFit: 'cover', opacity: 0.3 }}
            priority
          />
        </div>
      </section>
    </>
  );
}
