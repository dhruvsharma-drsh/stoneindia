import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/ui/header-3";
import About from "./components/About";
import EliteStone from "./components/EliteStone";
import Feedback from "./components/Feedback";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import AboutPage from "./pages/AboutPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import ProjectsPage from "./pages/ProjectsPage";
import PackagingPage from "./pages/PackagingPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <EliteStone />
      <Feedback />
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
    "/infrastructure", 
    "/projects",
    "/packaging",
    "/blog"
  ].includes(location.pathname) || location.pathname.startsWith("/blog/") || location.pathname.startsWith("/products/");

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      
      {/* Global Navigation Header - Rendered on all pages */}
      <Header />
      
      <main
        className={`relative min-h-screen w-screen overflow-x-hidden transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0"
        } ${isWhitePage ? "bg-white" : "bg-[#111111]"}`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/packaging" element={<PackagingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
        </Routes>
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

