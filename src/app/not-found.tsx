import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-accent/50">Error 404</p>
      <h1 className="mt-4 font-display text-[24vw] font-bold leading-none text-stroke md:text-[13rem]">
        404
      </h1>
      <p className="mt-4 max-w-md text-accent/60">
        The page you&apos;re looking for drifted into the void. Let&apos;s get you
        back to solid ground.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:scale-105"
      >
        Back to home ↗
      </Link>
    </section>
  );
}
