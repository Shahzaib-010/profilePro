 <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-full border border-app-border bg-app-surface px-5 py-3 text-sm font-semibold text-app-fg shadow-soft transition hover:border-app-highlight p-2 m-2 hover:text-app-highlight"
          >
            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          </button>





          <main className="min-h-screen bg-app-bg text-app-fg transition-colors duration-300">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 border-b border-app-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full border border-app-highlight/30 bg-app-highlight-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-app-highlight">
              Tailwind Theme Setup
            </p>
            <h1 className="text-4xl font-black tracking-tight text-app-fg sm:text-5xl">
              Light and dark mode are now ready.
            </h1>
            <p className="mt-4 text-base leading-7 text-app-muted sm:text-lg">
              All main colors are declared as reusable theme tokens, so you can
              update the palette later without rewriting component classes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-full border border-app-border bg-app-surface px-5 py-3 text-sm font-semibold text-app-fg shadow-soft transition hover:border-app-highlight hover:text-app-highlight"
          >
            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <article className="rounded-3xl border border-app-border bg-app-surface p-6 shadow-soft sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-app-highlight">
              Declared theme colors
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {themeSwatches.map(({ label, tone, swatchClass }) => (
                <div
                  key={tone}
                  className="rounded-2xl border border-app-border bg-app-panel p-4"
                >
                  <div className={`mb-3 h-16 rounded-xl border border-app-border ${swatchClass}`} />
                  <p className="text-sm font-medium text-app-fg">{label}</p>
                  <p className="mt-1 text-xs text-app-muted">{tone}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-app-border bg-app-panel p-6 shadow-soft">
              <h2 className="text-xl font-bold text-app-fg">
                Current mode: <span className="text-app-highlight">{theme}</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-app-muted">
                The base setup uses white for light mode, black for dark mode,
                opposite foreground colors, and yellow accents for highlights.
              </p>
            </div>

            <div className="rounded-3xl border border-app-border bg-app-surface p-6 shadow-soft">
              <h3 className="text-lg font-bold text-app-fg">
                Styling direction
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-app-muted">
                <li>White background in light mode, black background in dark mode.</li>
                <li>Text automatically flips to the opposite contrast color.</li>
                <li>Yellow is reserved for highlights, badges, and focus moments.</li>
                <li>All tokens live in one place so you can change them later.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>