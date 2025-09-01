import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from 'flowbite-react';
import Layout from '@/src/components/Layout';
import { ThemeInit } from '@/.flowbite-react/init';

// I'm trying to override the default style of flowbite-react and this is not working as expected
// const customTheme = createTheme({
//   navbar: {
//     link: {
//       active: {
//         on: 'font-semibold', // ✅ active link is black
//         off: 'text-gray-700' // inactive
//       }
//     }
//   }
// });

const customTheme = createTheme({
  navbar: {
    link: {
      base: 'px-3 py-2 rounded-md text-sm font-medium', // optional base styles
      active: {
        on: 'font-semibold text-black',
        off: 'text-gray-700'
      }

      // inactive: 'text-gray-700'
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <ThemeInit />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
