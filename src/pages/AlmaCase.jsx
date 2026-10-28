import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import LiveDemo from '../components/LiveDemo.jsx';

const ALMA_URL = 'https://sharonne-gunasena.github.io/Alma/';
const ALMA_REPO = 'https://github.com/Sharonne-Gunasena/Alma';

const FEATURES = [
  {
    title: 'Planner that fits your week',
    body: 'Imports your timetable and places study sessions into the gaps, least-slack first. It warns when work won’t fit and reschedules when plans change.',
  },
  {
    title: 'Flashcards from your own slides',
    body: 'Reads lecture slides section by section, including slide images, and builds cards that link back to the source page. Runs on the student’s own free AI key.',
  },
  {
    title: 'Study mode that remembers',
    body: 'Spaced repetition with weak-topic tracking. Typed answers are graded with feedback, and an “Explain this” tutor works from the notes.',
  },
  {
    title: 'Modules, chat and shared workspaces',
    body: 'Module hubs with classmates, direct and group chat, and workspaces with a shared whiteboard and notes that edit live.',
  },
];

const PROBLEMS = [
  {
    title: 'An editor stuck in a render loop',
    problem: 'The rich-text editor kept re-rendering itself, because its extensions were rebuilt on every render.',
    fix: 'Memoised the extensions, created the editor once, and kept event handlers stable.',
  },
  {
    title: 'Whiteboard edits that never synced',
    problem: 'The whiteboard library changes its element objects in place, so the stored references meant later edits were never sent.',
    fix: 'Copy elements with structuredClone when sending and receiving, and added a test that reproduces the bug.',
  },
  {
    title: 'A permissions hole in chat',
    problem: 'Members could change which conversation their membership row belonged to, and could change their own role.',
    fix: 'A migration that revokes the blanket update permission and allows only the mute and last-read fields.',
  },
];

const STACK = ['React 19', 'Vite', 'Tailwind CSS', 'Motion', 'Supabase (Postgres, Auth, Realtime, Storage, Edge Functions)', 'Yjs', 'Tiptap', 'Excalidraw', 'Vitest', 'GitHub Actions'];

export default function AlmaCase() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 pb-20 lg:px-10">
        <a href="#/" className="text-sm text-muted no-underline hover:text-ink">
          ← All projects
        </a>

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold text-orange-600">Case study · Live</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">Alma</h1>
          <p className="mt-6 text-lg text-muted">
            A study platform for university students. It plans around the real timetable, turns lecture slides into flashcards, and lets classmates share material for each module.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={ALMA_URL} target="_blank" rel="noreferrer" className="rounded-full bg-linear-to-br from-orange-500 to-red-500 px-5 py-2.5 font-medium text-white no-underline shadow-lg shadow-orange-500/30">
              Open Alma
            </a>
            <a href={ALMA_REPO} target="_blank" rel="noreferrer" className="rounded-full border border-line bg-white px-5 py-2.5 font-medium text-ink no-underline hover:border-orange-300">
              View the code
            </a>
          </div>
        </header>

        <Section eyebrow="The problem" title="Study life is scattered">
          <p className="max-w-3xl text-lg text-muted">
            Students juggle Brightspace, timetables, group chats and generic chatbots. None of them knows which modules you take, when you should study, or who on your course has good material. Alma brings those together.
          </p>
        </Section>

        <Section eyebrow="What it does" title="One place for the whole semester">
          <div className="grid gap-5 md:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Hard problems" title="What broke, and what changed">
          <div className="grid gap-5 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="flex flex-col rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted">{p.problem}</p>
                <p className="mt-4 rounded-2xl bg-sky-50 p-4 text-sm text-sky-900">
                  <span className="font-semibold">Fix: </span>
                  {p.fix}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="By the numbers" title="Built to be checked">
          <dl className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <Stat value="66" label="automated tests" />
            <Stat value="7" label="database migrations with row-level security" />
            <Stat value="5" label="product areas: planner, study, modules, chat, workspaces" />
            <Stat value="Auto" label="deploys on every push to main" />
          </dl>
        </Section>

        <Section eyebrow="Stack" title="What it's built with">
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span key={s} className="rounded-full bg-white px-3 py-1.5 text-sm text-ink ring-1 ring-line">
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section eyebrow="Try it" title="Alma, running live">
          <LiveDemo src={`${ALMA_URL}#/demo`} title="Alma live demo" />
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({ eyebrow, title, children }) {
  return (
    <section className="mt-20">
      <p className="text-sm font-semibold text-orange-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-orange-600">{value}</dd>
    </div>
  );
}
