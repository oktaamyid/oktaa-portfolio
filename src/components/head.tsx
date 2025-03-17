import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      {/* Meta Tags untuk SEO */}
      <title>Firtiansyah Okta Resama - Portfolio</title>
      <meta name="description" content="Firtiansyah Okta Resama is a Web Developer, Programmer, and Full-stack Engineer from Indonesia, specializing in website innovation and backend development." />
      <meta name="keywords" content="Firtiansyah Okta Resama, Web Developer, Programmer, Full-stack Engineer, Inovation Website, From Indonesia, Backend Developer, Siapa itu Firtiansyah Okta Resama, Biasa dipanggil Okta" />
      <meta name="author" content="Firtiansyah Okta Resama, Okta, Mas Okta, Tian, Firtiansyah, Resama" />

      {/* Open Graph for Social Media (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content="Firtiansyah Okta Resama - Portfolio" />
      <meta property="og:description" content="Portfolio of Firtiansyah Okta Resama - Web Developer & Programmer" />
      <meta property="og:image" content="/images/portfolio-thumbnail.jpg" />
      <meta property="og:url" content="https://your-portfolio.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Firtiansyah Okta Resama - Portfolio" />
      <meta name="twitter:description" content="Portfolio Firtiansyah Okta Resama - Web Developer & Programmer" />
      <meta name="twitter:image" content="/images/portfolio-thumbnail.jpg" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
