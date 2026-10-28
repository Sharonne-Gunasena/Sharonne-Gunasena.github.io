import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Shelf from '../components/Shelf.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Shelf />
      </main>
      <Footer />
    </>
  );
}
