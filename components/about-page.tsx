export function AboutPageContent() {
  return (
    <article className="w-full">
      {/* Hero */}
      <section className="border-b border-black/10 px-4 py-20 dark:border-white/10 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 sm:tracking-[0.35em] dark:text-white/40">
            Our Story
          </p>
          <h1 className="font-display text-balance text-4xl uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
            Greatness is not determined by where you begin, but by what you build.
          </h1>
        </div>
      </section>

      {/* Baltimore */}
      <section className="border-b border-black/10 bg-neutral-50 px-4 py-16 dark:border-white/10 dark:bg-dark-900 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-white/40">
              Origin
            </p>
            <h2 className="font-display mt-4 text-3xl uppercase tracking-tight text-neutral-900 md:text-4xl dark:text-white">
              Baltimore
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
            <p>
              Noland Mears 3rd Brand Inc. was founded on one belief: greatness is not determined by where you
              begin, but by what you build.
            </p>
            <p>
              I was raised in East Baltimore. Those streets gave me my foundation, my hunger, and my
              perspective. Although East Baltimore will always be home, I also spent meaningful years on the
              West Side, building relationships and learning that regardless of what side of the city
              you&apos;re from, our stories are connected by resilience, ambition, and the pursuit of something
              greater.
            </p>
            <p>
              This company is a reflection of Baltimore—not divided by neighborhoods, but united by culture.
            </p>
          </div>
        </div>
      </section>

      {/* Founding */}
      <section className="border-b border-black/10 px-4 py-16 dark:border-white/10 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
            At just 17 years old, I founded Righteous Clothing Brand with a vision of creating clothing that
            represented faith, integrity, and purpose. As that vision evolved, so did the family of brands.
            Luxury Trenchwear was established to redefine luxury through exceptional craftsmanship and timeless
            outerwear, while Militant Collective was created to embody discipline, accountability, and
            unwavering character.
          </p>
          <p className="font-display text-xl uppercase tracking-wide text-neutral-900 md:text-2xl dark:text-white">
            Each brand has its own identity, but they all share the same foundation.
          </p>
        </div>
      </section>

      {/* Brands */}
      <section className="border-b border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-dark-900">
        <div className="mx-auto max-w-6xl divide-y divide-black/10 dark:divide-white/10">
          <div className="grid gap-8 px-4 py-14 md:grid-cols-[220px_1fr] md:gap-16 md:px-8 md:py-20 lg:px-12">
            <h2 className="font-display text-2xl uppercase tracking-tight text-neutral-900 md:text-3xl dark:text-white">
              Righteous Clothing Brand
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
              <p>Righteous Clothing Brand represents living with purpose.</p>
              <p>
                It is a reminder that true character is revealed by the choices we make when no one else is
                watching. We believe righteousness is not perfection—it is the daily decision to pursue what
                is right with faith, humility, and conviction.
              </p>
            </div>
          </div>

          <div className="grid gap-8 px-4 py-14 md:grid-cols-[220px_1fr] md:gap-16 md:px-8 md:py-20 lg:px-12">
            <h2 className="font-display text-2xl uppercase tracking-tight text-neutral-900 md:text-3xl dark:text-white">
              Luxury Trenchwear
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
              <p>
                Luxury Trenchwear challenges the traditional definition of luxury. To us, luxury is not
                measured by a price tag. Luxury simply means an extreme state of comfort.
              </p>
              <blockquote className="border-l-2 border-neutral-900 pl-6 dark:border-white">
                <p className="font-display text-lg uppercase leading-snug tracking-wide text-neutral-900 md:text-xl dark:text-white">
                  &ldquo;The people who survived the sword found grace in the wilderness.&rdquo;
                </p>
              </blockquote>
              <p>
                We interpret those words as a reminder that luxury is what you make it. After surviving
                life&apos;s hardest seasons, even the smallest moments of peace become extraordinary. Whether
                the wilderness remains around you or not, surviving it changes your appreciation for comfort,
                opportunity, and life itself.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {["Luxury is gratitude.", "Luxury is peace.", "Luxury is having another day to build your future.", "Luxury is making it home."].map(
                  (line) => (
                    <li
                      key={line}
                      className="border border-black/10 px-4 py-3 text-xs uppercase tracking-[0.15em] text-neutral-800 dark:border-white/10 dark:text-white/80"
                    >
                      {line}
                    </li>
                  ),
                )}
              </ul>
              <p>That belief is woven into every garment we construct.</p>
            </div>
          </div>

          <div className="grid gap-8 px-4 py-14 md:grid-cols-[220px_1fr] md:gap-16 md:px-8 md:py-20 lg:px-12">
            <h2 className="font-display text-2xl uppercase tracking-tight text-neutral-900 md:text-3xl dark:text-white">
              Militant Collective
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
              <p>
                Militant Collective is not about conflict with others. It is about mastering yourself. It
                represents discipline, consistency, self-control, and the commitment to do what is right when
                no one else is looking. It is about protecting your future, honoring your family, staying
                focused despite distractions, and understanding that every wise decision creates another
                opportunity to continue your journey.
              </p>
              <p className="font-display text-xl uppercase tracking-wide text-neutral-900 md:text-2xl dark:text-white">
                Make it home every day.
              </p>
              <p>
                Because every day you make it home is another chance to grow, create, love, lead, and leave
                something behind that outlives you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-black/10 px-4 py-16 dark:border-white/10 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-white/40">
            Philosophy
          </p>
          <div className="mt-10 grid gap-px bg-black/10 md:grid-cols-2 dark:bg-white/10">
            <div className="bg-white p-8 dark:bg-dark-900 md:p-12">
              <h2 className="font-display text-3xl uppercase tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                Playing For Keeps
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
                We are not interested in temporary trends or fleeting attention. We design garments with
                intention, craftsmanship, and longevity. Every collection is built to become part of a
                legacy, not just another season.
              </p>
            </div>
            <div className="bg-white p-8 dark:bg-dark-900 md:p-12">
              <h2 className="font-display text-3xl uppercase tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                Pray For The Prey
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-white/55">
                It is a reminder to never lose compassion for those still fighting battles the world cannot
                see. We remember the overlooked, the underestimated, and the communities that continue to
                create culture while searching for opportunity. We believe success means reaching back as you
                move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-black/10 bg-neutral-50 px-4 py-16 dark:border-white/10 dark:bg-dark-900 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-white/40">
            Mission
          </p>
          <p className="mt-8 text-sm leading-relaxed text-neutral-600 md:text-lg dark:text-white/55">
            Our mission is to construct high-fashion garments that honor the people who inspire them. We
            believe the neighborhoods that have shaped music, art, fashion, and culture deserve to experience
            luxury not as spectators, but as creators, innovators, and leaders.
          </p>
          <ul className="mt-12 space-y-3">
            {[
              "Every stitch represents resilience.",
              "Every garment represents purpose.",
              "Every collection represents legacy.",
            ].map((line) => (
              <li
                key={line}
                className="font-display text-xl uppercase tracking-wide text-neutral-900 md:text-2xl dark:text-white"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="px-4 py-20 dark:border-white/10 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-2xl uppercase leading-snug tracking-tight text-neutral-900 md:text-4xl dark:text-white">
            This is more than fashion.
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {["Faith.", "Discipline.", "Gratitude.", "Baltimore."].map((word) => (
              <li
                key={word}
                className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-white/45"
              >
                {word}
              </li>
            ))}
          </ul>
          <div className="mt-16 space-y-2">
            <p className="font-display text-3xl uppercase tracking-tight text-neutral-900 md:text-5xl dark:text-white">
              Playing For Keeps.
            </p>
            <p className="font-display text-3xl uppercase tracking-tight text-neutral-900 md:text-5xl dark:text-white">
              Pray For The Prey.
            </p>
          </div>
          <div className="mt-16 border-t border-black/10 pt-12 dark:border-white/10">
            <p className="font-display text-lg uppercase tracking-wide text-neutral-900 md:text-xl dark:text-white">
              Noland Mears 3rd Brand Inc.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-white/45">
              Inspired by East Baltimore. Respecting the West. Crafted with purpose. Designed for the world.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
