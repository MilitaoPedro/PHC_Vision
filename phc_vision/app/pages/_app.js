import React from 'react';
import { AuthProvider } from '@/components/Auth/auth'; // Ajuste o caminho conforme necessário

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;