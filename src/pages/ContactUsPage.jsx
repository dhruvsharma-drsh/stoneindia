import React from 'react';
import { Contact2 } from '@/components/ui/contact-2';
import Footer from '@/components/Footer';

const ContactUsPage = () => {
  return (
    <div className="bg-white min-h-screen pt-24 text-[#14140F]">
      <Contact2
        title="Let's Create Together, Something Timeless."
        description="Whether you're looking for premium natural stone, exploring custom solutions, or simply want to learn more — we'd love to hear from you. Our team responds within 24 hours."
        phone="+91 937 101 3666"
        email="info@stoneindia.co"
        address="C-56 Industrial Area, Banmore, Morena, Madhya Pradesh 476444"
        web={{ label: "www.stoneindia.co", url: "https://www.stoneindia.co" }}
      />
      <Footer />
    </div>
  );
};

export default ContactUsPage;

