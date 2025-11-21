
export default function WebsiteCard({
  url,
  title,
  img,
  tag,
}: {
  url: string;
  title: string;
  img?: string;
  tag?: string;
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="w-full sm:w-[320px] md:w-[360px] rounded-2xl border-2 border-border bg-surface text-foreground p-4 sm:p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:ring-1 ring-border/60 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {img && (
            <img src={img} alt={title} className="w-14 h-12 sm:w-16 sm:h-14 image-auto-contrast" />
          )}
          <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
        </div>

        <div className="text-foreground/80 text-sm sm:text-base">
          {tag && <p className="mt-1">{tag}</p>}
        </div>
      </div>
    </a>
  );
}
