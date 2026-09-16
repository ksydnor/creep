import { getSiteSettings } from "@/lib/content";

export const revalidate = 60;

export const metadata = { title: "Contact" };

const fieldClass =
  "mt-2 w-full border border-white/20 bg-charcoal px-4 py-3 text-base text-paper placeholder:text-bone/40 focus:border-paper";
const labelClass = "block text-xs font-semibold uppercase tracking-exhibit text-ash";

export default async function ContactPage({ searchParams }) {
  const [site, { sent, error }] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <main className="min-h-screen pt-24">
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <h1 className="font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.015em] text-balance [font-stretch:62%]">
          Contact
        </h1>
        {site.email ? (
          <p className="mt-6 text-lg text-bone/80">
            Or email{" "}
            <a className="underline decoration-bone/40 underline-offset-4 hover:decoration-bone" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        ) : null}
      </section>
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        {sent ? (
          <p className="max-w-xl border border-white/15 p-6 text-lg text-bone/85" role="status">
            Thanks, your message has been sent.
          </p>
        ) : (
          <form action="/api/contact" className="grid max-w-xl gap-6" method="post">
            {error ? (
              <p className="border border-signal p-4 text-sm text-bone/85" role="alert">
                Please fill in every field with a valid email address, then try again.
              </p>
            ) : null}
            <label className={labelClass}>
              Name
              <input autoComplete="name" className={fieldClass} maxLength={200} name="name" required type="text" />
            </label>
            <label className={labelClass}>
              Email
              <input autoComplete="email" className={fieldClass} maxLength={200} name="email" required type="email" />
            </label>
            <label className={labelClass}>
              Message
              <textarea className={fieldClass} maxLength={4000} name="message" required rows={7} />
            </label>
            {/* Honeypot: hidden from people, filled in by bots. */}
            <label className="hidden" aria-hidden="true">
              Website
              <input autoComplete="off" name="website" tabIndex={-1} type="text" />
            </label>
            <button
              className="justify-self-start border border-paper px-6 py-3 text-xs font-semibold uppercase tracking-exhibit transition-colors duration-200 hover:bg-paper hover:text-ink"
              type="submit"
            >
              Send
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
