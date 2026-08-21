import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Plans from '@/pages/Plans';
import Nutrition from '@/pages/Nutrition';
import AtHome from '@/pages/AtHome';
import Shop from '@/pages/Shop';
import Contact from '@/pages/Contact';
import Register from '@/pages/Register';
import FreeTrial from '@/pages/FreeTrial';
import Feedback from '@/pages/Feedback';
import Profile from '@/pages/Profile';
import Checkout from '@/pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-ink-950 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/at-home" element={<AtHome />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/free-trial" element={<FreeTrial />} />
                <Route path="/feedback" element={<Feedback />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
