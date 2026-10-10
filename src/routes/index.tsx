import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ClientChart } from "@/components/charts/client-chart";
import { CHART, tooltipStyle } from "@/components/charts/theme";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { faNum, formatRate } from "@/lib/format";
import { GRADE } from "@/lib/grade";

export const Route = createFileRoute("/")({ component: Home });

function num(v: string | number) {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return String(v);
  if (n > 0 && n < 1) return formatRate(n);
  return faNum(n, 0);
}

function Home() {
  const byLabel = Object.fromEntries(GRADE.summary.map((s) => [s.label, s]));
  const series = GRADE.months.map((m) => ({ name: m.name, تولید: m.total, B: m.b }));
  const top = GRADE.models.filter((m) => m.b > 0).slice(0, 6);

  return (
    <div>
      <PageHeader kicker="میز فرمان کیفیت" title="خلاصه گرید محصول">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          نرخ گرید B برابر است با تعداد B تقسیم بر کل تولید ثبت‌شده. اعداد عیناً از فایل مدیریتی شش‌ماهه است.
        </p>
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="کل محصولات" value={num(byLabel["کل محصولات ثبت‌شده"]?.value ?? 0)} hint={byLabel["کل محصولات ثبت‌شده"]?.note} />
        <KpiCard label="گرید B" value={num(byLabel["تعداد محصولات گرید B"]?.value ?? 0)} hint={byLabel["تعداد محصولات گرید B"]?.note} />
        <KpiCard label="نرخ کلی گرید B" value={num(byLabel["نرخ کلی گرید B"]?.value ?? 0)} hint={`${num(byLabel["تعداد مدل‌های موجود"]?.value ?? 0)} مدل`} />
        <KpiCard
          label="بیشترین B"
          value={String(byLabel["مدل با بیشترین تعداد B"]?.value ?? "—").split(" - ")[0]!}
          hint={`${byLabel["مدل با بیشترین تعداد B"]?.note ?? ""} · اوج ماه: ${byLabel["ماه با بیشترین نرخ گرید B"]?.value ?? "—"}`}
        />
      </section>

      <section className="mt-5 grid gap-3 xl:grid-cols-5">
        <Card className="rounded-lg p-4 xl:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>تولید و گرید B در ماه</CardTitle>
              <CardHint>کمترین نرخ: {String(byLabel["ماه با کمترین نرخ گرید B"]?.value ?? "—")} · بیشترین نرخ: {String(byLabel["ماه با بیشترین نرخ گرید B"]?.value ?? "—")}</CardHint>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/months">روند</Link>
            </Button>
          </CardHeader>
          <ClientChart>
            <div className="h-[260px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <CartesianGrid stroke={CHART.grid} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [faNum(Number(v), 0), String(name)]} />
                  <Bar dataKey="تولید" fill={CHART[2]} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="B" fill={CHART[4]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ClientChart>
        </Card>
        <Card className="rounded-lg p-4 xl:col-span-2">
          <CardHeader>
            <CardTitle>خانواده محصول</CardTitle>
          </CardHeader>
          <ul className="space-y-3">
            {GRADE.families.map((f) => (
              <li key={f.name}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span>{f.name}</span>
                  <span className="tabular text-fg-muted">{faNum(f.b, 0)} B · {formatRate(f.rate)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-bg-subtle">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(6, f.share * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <CardTitle>مدل‌های دارای گرید B</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/models">همه مدل‌ها</Link>
          </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-sm">
            <thead className="text-xs text-fg-muted">
              <tr>
                <th className="pb-2 text-right font-medium">مدل</th>
                <th className="pb-2 text-left font-medium">تولید</th>
                <th className="pb-2 text-left font-medium">B</th>
                <th className="pb-2 text-left font-medium">نرخ</th>
                <th className="pb-2 text-left font-medium">سهم از B</th>
              </tr>
            </thead>
            <tbody>
              {top.map((m) => (
                <tr key={m.code} className="border-t border-border">
                  <td className="py-2.5">{m.name}</td>
                  <td className="py-2.5 text-left tabular">{faNum(m.total, 0)}</td>
                  <td className="py-2.5 text-left tabular">{faNum(m.b, 0)}</td>
                  <td className="py-2.5 text-left tabular">{formatRate(m.rate)}</td>
                  <td className="py-2.5 text-left tabular">{formatRate(m.share, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
