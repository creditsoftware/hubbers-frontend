import React from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import * as locales from '../locales';
import '../styles/index.scss';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const messages = locales[locale];
  React.useEffect(()=>{
    import('ckeditor5-build-classic-dna');
  },[]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <NextNprogress
        color="#8bc53b"
        stopDelayMs={200}
        height="3"
      />
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;