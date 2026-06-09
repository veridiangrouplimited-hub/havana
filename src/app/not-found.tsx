import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-serif text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-brand-deep">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
        The page you are looking for may have been moved or no longer exists. Try the search, or
        return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-deep"
        >
          Go to Homepage
        </Link>
        <Link
          href="/search"
          className="rounded border-2 border-brand px-6 py-3 text-sm font-bold text-brand hover:bg-brand hover:text-white"
        >
          Search the Website
        </Link>
        <Link
          href="/contact"
          className="rounded border-2 border-brand px-6 py-3 text-sm font-bold text-brand hover:bg-brand hover:text-white"
        >
          Contact the Mission
        </Link>
      </div>
    </div>
  );
}
