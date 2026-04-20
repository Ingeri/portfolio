import OrbAnimation from "@/components/OrbAnimation";
import ContactForm from "@/components/ContactForm";

const socials = [
  { label: "GitHub", value: "github.com/ingeri", href: "#" },
  { label: "LinkedIn", value: "linkedin.com/in/ingeri", href: "#" },
  { label: "Twitter", value: "twitter.com/ingeri", href: "#" },
];

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Contact
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Let’s build something meaningful together.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            I’m open to web development, software engineering, and product collaborations. Reach out to discuss an idea, contractor opportunity, or technical project.
          </p>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">Email</p>
            <a href="mailto:hello@ingeri.dev" className="text-2xl font-semibold text-blue-600 hover:text-blue-700">
              hello@ingeri.dev
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950/5 p-8 shadow-lg">
          <OrbAnimation />
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          {socials.map((social) => (
            <div key={social.label} className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-3">{social.label}</p>
              <p className="text-slate-600 leading-7">{social.value}</p>
              <a href={social.href} className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm">
                Visit profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
