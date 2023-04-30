import '@/styles/globals.css';
import Header from '@/components/header-bar';
import { CartProvider } from '@/components/cart-context';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}
