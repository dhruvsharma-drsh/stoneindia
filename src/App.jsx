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

function HomePage() {
  return (
    <>
      <Header />
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
  const isAboutPage = location.pathname === "/about";

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <main
        className={`relative min-h-screen w-screen overflow-x-hidden transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0"
        } ${isAboutPage || location.pathname === "/infrastructure" ? "bg-white" : "bg-[#111111]"}`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
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

