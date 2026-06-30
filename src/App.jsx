import About from "./components/About";
import EliteStone from "./components/EliteStone";
import Feedback from "./components/Feedback";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#111111]">
      <Hero />
      <About />
      <EliteStone />
      <Feedback />
      <Footer />
    </main>
  );
}

export default App;
