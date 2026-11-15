import { BrowserRouter as Router, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import VideoSection from './components/VideoSection'
import TrustBadges from './components/TrustBadges'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import OrderForm from './components/OrderForm'
import About from './components/About'
import Catalog from './components/Catalog'
import { OrdersProvider } from './context/OrdersContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { useState, useEffect } from 'react'
import Login from './components/Dashboard/Login'
import DashboardHome from './components/Dashboard/DashboardHome'
import ProductManager from './components/Dashboard/ProductManager'
import OrderManager from './components/Dashboard/OrderManager'

import DashboardLayout from './components/Dashboard/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import CartDrawer from './components/CartDrawer'
import ProductDetails from './components/ProductDetails'
import api from './api/axios'
import ScrollToTop from './components/ScrollToTop'
import { DEFAULT_PRODUCTS } from './data/defaultProducts'

const Home = ({ onOrder }: { onOrder: (product: any, weight?: string, quantity?: number) => void }) => {
  const { isAr } = useLanguage();
  const [products, setProducts] = useState<any[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = categoryFilter
          ? `/products/?category=${categoryFilter}`
          : '/products/?is_promo=true';

        const response = await api.get(endpoint);
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];

        if (data.length > 0) {
          setProducts(data);
        } else {
          setProducts(DEFAULT_PRODUCTS);
        }
      } catch (error) {
        console.error('Using default products (API unreachable):', error);
        setProducts(DEFAULT_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryFilter]);

  useEffect(() => {
    if (categoryFilter) {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [categoryFilter, loading]);

  const filteredProducts = categoryFilter
    ? products.filter(p => String(p.category) === categoryFilter)
    : products;

  return (
    <>
      <Hero />
      <TrustBadges />
      <section id="products" style={{ padding: 'clamp(3rem, 10vw, 7rem) 0', background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto clamp(2rem, 8vw, 5rem) auto' }}>
            <h2 className="section-title">
              {categoryFilter && filteredProducts.length > 0
                ? (isAr ? `منتجاتنا : ${filteredProducts[0]?.category_name || ''}` : `Nos Produits : ${filteredProducts[0]?.category_name || ''}`)
                : (isAr ? "عروض خاصة وتخفيضات" : "Promotions & Offres Spéciales")}
            </h2>

          </div>
          <div className="product-grid-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 500px))',
            justifyContent: 'center',
            gap: 'var(--grid-gap, 2.5rem)'
          }}>
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
                <div className="loader">{isAr ? 'جاري التحميل...' : 'Chargement...'}</div>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name_fr}
                  name_ar={product.name_ar}
                  price={`${product.price} DH`}
                  category={product.category_name || 'Divers'}
                  image={product.image}
                  description={product.description_fr}
                  origin={product.origin_fr || 'Maroc'}
                  benefits={product.benefits_fr || 'Naturel'}
                  weight={product.weight}
                  onOrder={(weight, qty) => onOrder(product, weight, qty)}
                  is_promo={product.is_promo}
                  discount_price={product.discount_price}
                />
              ))
            )}
            {!loading && filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                {isAr ? 'لا توجد منتجات في هذه الفئة حالياً...' : 'Aucun produit trouvé dans cette catégorie pour le moment...'}
              </div>
            )}
          </div>

          {/* Bulk Order > 10L WhatsApp Banner */}
          <div style={{
            maxWidth: '1040px',
            margin: '2.5rem auto 0 auto',
            padding: 'clamp(1.5rem, 4vw, 2.2rem)',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #f8fbf4 0%, #eef7e3 100%)',
            border: '2px solid rgba(124, 179, 66, 0.35)',
            boxShadow: '0 12px 30px rgba(21, 50, 25, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: '999px', background: 'var(--primary)', color: 'white', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: isAr ? '0' : '1px', marginBottom: '0.6rem' }}>
                {isAr ? 'طلبات أكثر من 10 لتر' : 'Commandes > 10 Litres'}
              </div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', color: 'var(--secondary)', marginBottom: '0.4rem', fontWeight: 800 }}>
                {isAr ? 'هل ترغب في طلب أكثر من 10 لتر ؟' : 'Vous souhaitez commander plus de 10L ?'}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.98rem', margin: 0, lineHeight: 1.6 }}>
                {isAr ? (
                  <>بالنسبة لأي طلب يفوق <strong>10 لترات</strong>، المرجو التواصل معنا مباشرة عبر الواتساب.</>
                ) : (
                  <>Pour toute commande supérieure à <strong>10 Litres</strong>, veuillez nous contacter directement sur WhatsApp.</>
                )}
              </p>
            </div>
            <a
              href="https://wa.me/212674434896?text=Bonjour, je souhaite commander plus de 10 litres d'huile d'olive."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.8rem',
                borderRadius: '16px',
                background: '#25D366',
                color: 'white',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 25px rgba(37, 211, 102, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {isAr ? 'تواصل عبر الواتساب' : 'Contacter sur WhatsApp'}
            </a>
          </div>
          {categoryFilter && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button
                onClick={() => window.location.href = '/'}
                className="btn"
                style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}
              >
                Voir tous les produits
              </button>
            </div>
          )}
        </div>
      </section>
      <VideoSection />

      {/* Mobile Grid Optimization Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          #products .container { padding: 0 1rem; }
          .product-grid-responsive {
            --grid-min-width: 140px;
            --grid-gap: 0.75rem;
          }
        }
      `}} />
    </>
  );
};

const AppContent = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal } = useCart();

  const handleOrder = (product: any, weight?: string, quantity: number = 1) => {
    const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^\d.]/g, '')) : product.price;
    const subtotal = price * quantity;
    const deliveryFee = 45;
    const total = subtotal + deliveryFee;

    setSelectedProduct(`${product.name_fr || product.name}${weight ? ' (' + weight + ')' : ''} x${quantity} (Total: ${total} DH [${subtotal} + ${deliveryFee} liv])`);
    setShowOrderForm(true);
  };

  const handleCheckout = () => {
    const deliveryFee = 45;
    const total = cartTotal + deliveryFee;
    const orderItems = cartItems.map(item => `${item.name}${item.weight ? ' (' + item.weight + ')' : ''} (x${item.quantity})`).join(', ');
    setSelectedProduct(`Panier: ${orderItems} (Total: ${total} DH [${cartTotal} + ${deliveryFee} liv])`);
    setShowOrderForm(true);
    setIsCartOpen(false);
  };

  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <div className="app">
      <ScrollToTop />
      {!isDashboard && <Navbar />}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <Routes>
        <Route path="/" element={<Home onOrder={handleOrder} />} />
        <Route path="/product/:id" element={<ProductDetails onOrder={handleOrder} />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog onOrder={(product, weight, qty) => handleOrder(product, weight, qty)} />} />
        <Route path="/contact" element={<div style={{ padding: '8rem 0' }} className="container"><h1>Contact</h1><p>Contactez-nous...</p></div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="orders" element={<OrderManager />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
      {showOrderForm && <OrderForm productName={selectedProduct} onClose={() => setShowOrderForm(false)} />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <Router>
              <AppContent />
            </Router>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
