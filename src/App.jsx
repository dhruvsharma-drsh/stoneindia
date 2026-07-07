import { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/ui/header-3";
import About from "./components/About";
import CategoryShowcase from "./components/CategoryShowcase";
import VerticalProductShowcase from "./components/VerticalProductShowcase";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

/* ── Lazy-loaded pages (only downloaded when navigated to) ── */
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const PackagingPage = lazy(() => import("./pages/PackagingPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const DesignSystemPage = lazy(() => import("./pages/DesignSystemPage"));

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ── Minimal loading fallback for lazy routes ── */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF9F5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#B8955D] border-t-transparent rounded-full animate-spin" />
        <span className="font-sans text-sm text-[#999] tracking-widest uppercase">Loading</span>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CategoryShowcase />
      <VerticalProductShowcase />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}

function AppContent() {
  const [splashDone, setSplashDone] = useState(false);
  const location = useLocation();
  
  // Define which pages should have a white background instead of the default dark one
  const isWhitePage = [
    "/about", 
    "/projects",
    "/packaging",
    "/blog",
    "/contact",
    "/design-system",
    "/products"
  ].includes(location.pathname) || location.pathname.startsWith("/blog/") || location.pathname.startsWith("/products/");

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      
      {/* Global Navigation Header - Rendered on all pages */}
      <Header />
      <ScrollToTop />
      
      <main
        className={`relative min-h-screen w-screen overflow-x-hidden transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0"
        } ${isWhitePage ? "bg-white" : "bg-[#111111]"}`}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/packaging" element={<PackagingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/products/:category/:slug" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
