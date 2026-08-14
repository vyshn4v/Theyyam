import { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Hero from './components/Hero';
import About from './components/About';
import Kannur from './components/Kannur';
import Ritual from './components/Ritual';
import Season from './components/Season';
import Where from './components/Where';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIntroComplete(true)} />
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Hero />
        <About />
        <Kannur />
        <Ritual />
        <Season />
        <Where />
        <Gallery />
        <Footer />
      </div>
    </>
  );
}

export default App;
