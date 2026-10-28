import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import AlmaCase from './pages/AlmaCase.jsx';

// Hash routes, so the site works on GitHub Pages without server rewrites.
const routes = { '/': Home, '/alma': AlmaCase };

const currentPath = () => window.location.hash.replace(/^#/, '') || '/';

export default function App() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onChange = () => {
      setPath(currentPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const Page = routes[path] ?? Home;
  return <Page />;
}
