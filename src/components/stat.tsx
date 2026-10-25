export function Stat({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold tracking-tight text-primary">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}