import Magnetic from './Magnetic.jsx';

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 mx-auto flex max-w-6xl items-center justify-between bg-paper/80 px-5 py-4 backdrop-blur-md lg:px-10">
      <a href="#/" className="group flex items-center gap-3 no-underline">
        <span className="grid size-10 place-items-center rounded-full bg-linear-to-br from-orange-500 to-red-500 font-hand text-lg text-white transition group-hover:rotate-12">
          SG
        </span>
        <span className="hidden font-semibold tracking-tight text-ink sm:inline">Sharonne Gunasena</span>
      </a>
      <nav className="flex items-center gap-6 text-sm">
        <NavLink href="#/alma">Alma</NavLink>
        <NavLink href="https://github.com/Sharonne-Gunasena" external>
          GitHub
        </NavLink>
      </nav>
    </header>
  );
}

function NavLink({ href, external, children }) {
  return (
    <Magnetic>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="relative py-1 text-muted no-underline transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform hover:text-ink hover:after:scale-x-100"
      >
        {children}
      </a>
    </Magnetic>
  );
}
