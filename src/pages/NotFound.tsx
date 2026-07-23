import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-4 py-10">
      <section className="max-w-md text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Compass size={28} />
        </div>
        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-content">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
