import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { faNum, formatRate } from "@/lib/format";
import { GRADE } from "@/lib/grade";

export const Route = createFileRoute("/families")({ component: FamiliesPage });

function FamiliesPage() {
  return (
    <div>
      <PageHeader title="خانواده محصول" kicker="استنتاج از نام محصول">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          دسته‌بندی خانواده مقدماتی است. تحلیل دقیق‌تر در سطح نام و کد محصول است.
        </p>
      </PageHeader>
      <section className="grid gap-3 md:grid-cols-3">
        {GRADE.families.map((f) => (
          <Card key={f.name} className="rounded-lg p-5">
            <p className="text-xs text-fg-muted">{f.name}</p>
            <p className="mt-2 font-display text-3xl tabular">{faNum(f.b, 0)}</p>
            <p className="text-xs text-fg-muted">گرید B از {faNum(f.total, 0)} تولید</p>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><dt className="text-fg-muted">گرید A</dt><dd className="tabular">{faNum(f.a, 0)}</dd></div>
              <div className="flex justify-between"><dt className="text-fg-muted">نرخ B</dt><dd className="tabular">{formatRate(f.rate)}</dd></div>
              <div className="flex justify-between"><dt className="text-fg-muted">سهم از کل B</dt><dd className="tabular">{formatRate(f.share, 1)}</dd></div>
            </dl>
          </Card>
        ))}
      </section>
    </div>
  );
}
