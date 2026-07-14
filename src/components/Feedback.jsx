import React from "react";
import { CircularTestimonials } from "./ui/circular-testimonials";
import { ArrowRight } from "lucide-react";

const rawTestimonials = [
  { id: 0, name: "Alessandro Rossi", role: "Principal Architect", location: "Milan, Italy", quote: "Flawless book-matched Calacatta marble for our royal palace project in Dubai. The precision exceeded our highest standards.", project: "Royal Palace, Dubai", img: "img/person_1.png" },
  { id: 1, name: "Elena Rostova", role: "Interior Design Head", location: "Zurich, Switzerland", quote: "Their custom fluted limestone vanities transformed our 200+ suite Swiss Alpine resort into an architectural sanctuary.", project: "Alpine Resort, Switzerland", img: "img/person_2.png" },
  { id: 2, name: "Sir Marcus Sterling", role: "Managing Director", location: "London, UK", quote: "The custom backlit emerald onyx wall is the undisputed centerpiece of our London corporate headquarters.", project: "Sterling Tower, London", img: "img/person_3.png" },
  { id: 3, name: "Rajeshwar Singhania", role: "Chief Projects Officer", location: "New Delhi, India", quote: "From quarry selection to export packaging, their engineering precision made complex installations effortless.", project: "National Centre, Delhi", img: "img/person_4.png" },
  { id: 4, name: "Camille Laurent", role: "Luxury Hospitality Director", location: "Paris, France", quote: "Sourcing direct from quarries gave us unmatched color consistency across our international villas.", project: "Laurent Villas, Côte d'Azur", img: "img/person_5.png" },
  { id: 5, name: "Hendrik Van Der Berg", role: "Facade Engineering Lead", location: "Cape Town, SA", quote: "The structural acoustics and bush-hammered finitures on our Dubai facade withstood intense desert heat flawlessly.", project: "Dubai Marina Tower", img: "img/person_6.png" },
  { id: 6, name: "Sophia Al-Mansoor", role: "Palace Development Chief", location: "Abu Dhabi, UAE", quote: "Direct access to rare Persian onyx and Indian marble blocks gave our royal interior unique luminosity.", project: "Al-Mansoor Palace", img: "img/person_7.png" },
];

const Feedback = () => {
  
  const testimonials = rawTestimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    designation: `${t.role} · ${t.location}`,
    src: t.img,
  }));

  return (
    <section id="feedback" className="relative w-full bg-white overflow-hidden pt-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mb-8">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-[1px] bg-[#B8955D]" />
          <span className="font-mono text-[11px] text-[#B8955D] uppercase tracking-[0.3em] font-bold">
            Client Stories
          </span>
        </div>
      </div>

      {/* Dark testimonials section */}
      <div className="min-h-[400px] flex flex-wrap gap-6 items-center justify-center relative pb-16">
        <div
          className="items-center justify-center relative flex w-full"
          style={{ maxWidth: "1200px" }}
        >
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#0a0a0a",
              designation: "#B8955D",
              testimony: "#171717",
              arrowBackground: "#f1f1f7",
              arrowForeground: "#141414",
              arrowHoverBackground: "#B8955D",
            }}
            fontSizes={{
              name: "28px",
              designation: "16px",
              quote: "22px",
            }}
          />
        </div>
      </div>

    </section>
  );
};

export default Feedback;
