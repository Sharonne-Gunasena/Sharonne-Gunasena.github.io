export default function LiveDemo({ src, title }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-orange-900/5">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-300" />
        <span className="size-2.5 rounded-full bg-orange-300" />
        <span className="size-2.5 rounded-full bg-sky-300" />
        <span className="ml-3 truncate text-xs text-muted">{src}</span>
        <a href={src} target="_blank" rel="noreferrer" className="ml-auto shrink-0 text-xs font-medium text-orange-700 no-underline hover:text-orange-600">
          Open full screen ↗
        </a>
      </div>
      <iframe title={title} src={src} loading="lazy" className="h-[480px] w-full bg-paper sm:h-[600px]" />
    </div>
  );
}
