import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Products } from './sections/Products';
import { About } from './sections/About';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { Showcase } from './sections/Showcase';
import { CTA } from './sections/CTA';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { MockupShowcase } from './components/mockups/MockupShowcase';

export function App() {
  return (
    <LanguageProvider>
      <div className="app-root">
        <Navbar />
        <main>
          <Hero />
          <Products />
          <About />
          <MockupShowcase/>
          <WhyChooseUs />
          <Showcase />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;