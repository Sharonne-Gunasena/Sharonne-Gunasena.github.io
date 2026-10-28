export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-line px-5 py-10 text-sm text-muted lg:px-10">
      © {new Date().getFullYear()} Sharonne Gunasena · Built with React, Vite and Tailwind
    </footer>
  );
}
