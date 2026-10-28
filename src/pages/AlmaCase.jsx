import { motion } from 'motion/react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import LiveDemo from '../components/LiveDemo.jsx';
import CountUp from '../components/CountUp.jsx';
import Magnetic from '../components/Magnetic.jsx';

const ALMA_URL = 'https://sharonne-gunasena.github.io/Alma/';
const ALMA_REPO = 'https://github.com/Sharonne-Gunasena/Alma';

const SECTIONS = [
  { id: 'problem', label: 'The problem' },
  { id: 'features', label: 'What it does' },
  { id: 'bugs', label: 'Hard problems' },
  { id: 'numbers', label: 'By the numbers' },
  { id: 'stack', label: 'Stack' },
  { id: 'try', label: 'Try it' },
];

const FEATURES = [
  {
    title: 'A planner that fits your week',
    body: 'Imports your timetable and places study sessions into the gaps, least-slack first. It warns when work won’t fit and reschedules when plans change.',
    mark: '01',
  },
  {
    title: 'Flashcards from your own slides',
    body: 'Reads lecture slides section by section, including slide images, and builds cards that link back to the source page. Runs on the student’s own free AI key.',
    mark: '02',
  },
  {
    title: 'Study mode that remembers',
    body: 'Spaced repetition with weak-topic tracking. Typed answers are graded with feedback, and an “Explain this” tutor works from the notes.',
    mark: '03',
  },
  {
    title: 'Modules, chat and workspaces',
    body: 'Module hubs with classmates, direct and group chat, and workspaces with a shared whiteboard and notes that edit live.',
    mark: '04',
  },
];

// Bugs written up like tickets: what broke, and what changed.
const BUGS = [
  {
    id: 'BUG-01',
    title: 'An editor stuck in a render loop',
    severity: 'High',
    problem: 'The rich-text editor kept re-rendering itself, because its extensions were rebuilt on every render.',
    fix: 'Memoised the extensions, created the editor once, and kept event handlers stable.',
  },
  {
    id: 'BUG-02',
    title: 'Whiteboard edits that never synced',
    severity: 'High',
    problem: 'The whiteboard library changes its element objects in place, so the stored references meant later edits were never sent.',
    fix: 'Copy elements with structuredClone when sending and receiving, and added a test that reproduces the bug.',
  },
  {
    id: 'BUG-03',
    title: 'A permissions hole in chat',
    severity: 'Critical',
    problem: 'Members could change which conversation their membership row belonged to, and could change their own role.',
    fix: 'A migration that revokes the blanket update permission and allows only the mute and last-read fields.',
  },
];

const STATS = [
  { to: 66, label: 'automated tests' },
  { to: 7, label: 'database migrations, each with row-level security' },
  { to: 5, label: 'product areas: planner, study, modules, chat, workspaces' },
];

const STACK = ['React 19', 'Vite', 'Tailwind CSS', 'Motion', 'Supabase', 'Postgres', 'Yjs', 'Tiptap', 'Excalidraw', 'Vitest', 'GitHub Actions'];

export default function AlmaCase() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 pb-10 lg:px-10">
        <a href="#/" className="inline-block text-sm text-muted no-underline hover:text-ink">
          ← all projects
        </a>

        <header className="mt-10 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-hand text-2xl text-orange-600">
            case study · live now
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-3 text-7xl leading-none font-semibold tracking-tighter sm:text-9xl">
            Alma<span className="text-orange-500">.</span>
          </motion.h1>
          <p className="mt-8 max-w-2xl text-xl text-muted">
            A study platform for university students. It plans around the real timetable, turns lecture slides into flashcards, and lets classmates share material for each module.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href={ALMA_URL} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-linear-to-br from-orange-500 to-red-500 px-6 py-3 font-medium text-white no-underline shadow-lg shadow-orange-500/30">
                Open Alma
              </a>
            </Magnetic>
            <Magnetic>
              <a href={ALMA_REPO} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-line bg-white px-6 py-3 font-medium text-ink no-underline hover:border-orange-300">
                View the code
              </a>
            </Magnetic>
          </div>
        </header>

        <div className="mt-20 grid gap-12 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 flex flex-col gap-3 text-sm text-muted">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-fit text-left transition-colors hover:text-orange-600"
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <Section id="problem" eyebrow="The problem" title="Study life is scattered">
              <p className="max-w-3xl text-xl text-muted">
                Students juggle Brightspace, timetables, group chats and generic chatbots. None of them knows which modules you take, when you should study, or who on your course has good material. Alma brings those together.
              </p>
            </Section>

            <Section id="features" eyebrow="What it does" title="One place for the whole semester">
              <div className="grid gap-5 md:grid-cols-2">
                {FEATURES.map((f) => (
                  <div key={f.title} className="rounded-3xl border border-line bg-white p-6 transition-transform hover:-translate-y-1">
                    <span className="font-hand text-2xl text-orange-500">{f.mark}</span>
                    <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted">{f.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="bugs" eyebrow="Hard problems" title="Bugs, and what changed">
              <div className="grid gap-6">
                {BUGS.map((b) => (
                  <Ticket key={b.id} bug={b} />
                ))}
              </div>
            </Section>

            <Section id="numbers" eyebrow="By the numbers" title="Built to be checked">
              <dl className="grid gap-5 sm:grid-cols-3">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-3xl border border-line bg-white p-6">
                    <dt className="text-sm text-muted">{s.label}</dt>
                    <dd className="mt-2 text-6xl font-semibold tracking-tight text-orange-600">
                      <CountUp to={s.to} />
                    </dd>
                  </div>
                ))}
                <div className="rounded-3xl border border-line bg-white p-6">
                  <dt className="text-sm text-muted">deploys</dt>
                  <dd className="mt-2 text-6xl font-semibold tracking-tight text-orange-600">Auto</dd>
                  <p className="mt-1 text-sm text-muted">every push to main</p>
                </div>
              </dl>
            </Section>

            <Section id="stack" eyebrow="Stack" title="What it's built with">
              <div className="flex flex-wrap gap-3">
                {STACK.map((s, i) => (
                  <span key={s} className="rounded-full bg-white px-4 py-2 text-sm text-ink ring-1 ring-line" style={{ transform: `rotate(${(i % 3) - 1}deg)` }}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="try" eyebrow="Try it" title="Alma, running live">
              <p className="mb-6 max-w-2xl text-muted">The demo below opens with a sample student, so you can see the planner, flashcards and weak-topic tracking straight away.</p>
              <LiveDemo src={`${ALMA_URL}#/demo`} title="Alma live demo" />
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 pt-20 first:pt-0">
      <p className="font-hand text-2xl text-orange-600">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

// A bug report: ticket header, the problem, and the fix.
function Ticket({ bug: b }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-3xl border border-line bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-subtle px-6 py-3 text-xs">
        <span className="font-mono text-muted">{b.id}</span>
        <span className="rounded-full bg-red-100 px-2.5 py-0.5 font-medium text-red-700">{b.severity}</span>
        <span className="font-medium text-emerald-700">fixed</span>
      </header>
      <div className="grid gap-6 p-6 md:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="text-xl font-semibold">{b.title}</h3>
          <p className="mt-3 text-sm text-muted">{b.problem}</p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-5">
          <p className="font-hand text-xl text-sky-800">what changed</p>
          <p className="mt-2 text-sm text-sky-950">{b.fix}</p>
        </div>
      </div>
    </motion.article>
  );
}
