import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Shelf from '../components/Shelf.jsx';
import Footer from '../components/Footer.jsx';

// What I work with, from the projects on the shelf.
const SKILLS = ['React', 'JavaScript', 'Tailwind CSS', 'Supabase', 'Postgres', 'Row-level security', 'Realtime sync (Yjs)', 'Vitest', 'GitHub Actions'];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee items={SKILLS} />
        <Shelf />
      </main>
      <Footer />
    </>
  );
}
