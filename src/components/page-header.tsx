import { COMPANY } from "@/lib/company";

export function PageHeader({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] tracking-[0.14em] text-fg-subtle">{kicker ?? COMPANY.periodLabel}</p>
        <h1 className="mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl">{title}</h1>
      </div>
      {children}
    </div>
  );
}
