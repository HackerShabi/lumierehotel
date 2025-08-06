import '../styles/globals.css'
import '../styles/cyan-theme.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lumiere Hotel - Book Hotels in Islamabad</title>
        <meta name="description" content="Lumiere Hotel is one of the best hotels in Islamabad. Book deluxe rooms with breakfast, comfortable stays, and explore nearby attractions." />
        <meta name="keywords" content="Lumiere Hotel, hotels in Islamabad, book hotel, deluxe rooms, best hotels Islamabad, Islamabad stay, family hotel, G-10 hotels, cheap hotel in islamabad, luxury hotel in islamabad, hotel reservation near me, hotel near me, Pakistan hotels, business hotel Islamabad, tourist hotel Islamabad" />
        <meta name="author" content="Lumiere Hotel Islamabad" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.facebook.com/mylumierehotel" />
        <meta property="og:title" content="Lumiere Hotel - Book Hotels in Islamabad" />
        <meta property="og:description" content="Lumiere Hotel is one of the best hotels in Islamabad. Book deluxe rooms with breakfast, comfortable stays, and explore nearby attractions." />
        <meta property="og:image" content="/hotel-og-image.jpg" />
        <meta property="og:site_name" content="Lumiere Hotel" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.facebook.com/mylumierehotel" />
        <meta name="twitter:title" content="Lumiere Hotel - Book Hotels in Islamabad" />
        <meta name="twitter:description" content="Lumiere Hotel is one of the best hotels in Islamabad. Book deluxe rooms with breakfast, comfortable stays, and explore nearby attractions." />
        <meta name="twitter:image" content="/hotel-og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="PK-IS" />
        <meta name="geo.placename" content="Islamabad" />
        <meta name="geo.position" content="33.6844;73.0479" />
        <meta name="ICBM" content="33.6844, 73.0479" />
        <link rel="canonical" href="https://www.facebook.com/mylumierehotel" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}