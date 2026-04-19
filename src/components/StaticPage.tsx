interface PageProps {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export const StaticPage = ({ eyebrow, title, intro, children }: PageProps) => (
  <section className="container-luxe py-12 lg:py-20 max-w-3xl">
    <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">✦ {eyebrow}</p>
    <h1 className="font-display text-4xl lg:text-5xl mb-4">{title}</h1>
    {intro && <p className="text-muted-foreground mb-10">{intro}</p>}
    <div className="prose prose-sm max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-foreground [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-foreground/80 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-4">
      {children}
    </div>
  </section>
);
