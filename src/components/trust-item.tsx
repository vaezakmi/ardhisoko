export function TrustItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{children}</p>
    </div>
  );
}