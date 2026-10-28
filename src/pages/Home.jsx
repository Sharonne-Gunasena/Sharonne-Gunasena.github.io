import { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Shelf from '../components/Shelf.jsx';
import Footer from '../components/Footer.jsx';
import Intro, { shouldIntro } from '../components/Intro.jsx';
import Cursor from '../components/Cursor.jsx';

const SKILLS = ['Study planning', 'Spaced repetition', 'Live whiteboards', 'Row-level security', 'Flashcards from slides', 'Realtime chat', 'Shared notes'];

export default function Home() {
  const [phase, setPhase] = useState(() => (shouldIntro() ? 'intro' : 'ready'));

  return (
    <>
      {phase === 'intro' && <Intro onDone={() => setPhase('ready')} />}
      <Cursor />
      <Nav />
      <main>
        <Hero ready={phase === 'ready'} />
        <Marquee items={SKILLS} />
        <Shelf />
      </main>
      <Footer />
    </>
  );
}
