import { createFileRoute } from "@tanstack/react-router";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ClientChart } from "@/components/charts/client-chart";
import { CHART, tooltipStyle } from "@/components/charts/theme";
import { PageHeader } from "@/components/page-header";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { faNum, formatPp, formatRate } from "@/lib/format";
import { GRADE } from "@/lib/grade";

export const Route = createFileRoute("/months")({ component: MonthsPage });

function MonthsPage() {
  const series = GRADE.months.map((m) => ({ name: m.name, B: m.b, نرخ: +(m.rate * 100).toFixed(2) }));
  return (
    <div>
      <PageHeader title="روند ماهانه" kicker="تاریخ جمع‌آوری">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          برای مقایسه منصفانه، درصد گرید B را ببینید نه فقط تعداد خام.
        </p>
      </PageHeader>
      <Card className="rounded-lg p-4">
        <CardTitle>تعداد B و نرخ</CardTitle>
        <CardHint className="mt-1">ستون تعداد B · خط نرخ درصد</CardHint>
        <ClientChart>
          <div className="mt-3 h-[280px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={series}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="l" tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <YAxis yAxisId="r" orientation="right" tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar yAxisId="l" dataKey="B" fill={CHART[4]} radius={[3, 3, 0, 0]} />
                <Line yAxisId="r" type="monotone" dataKey="نرخ" stroke={CHART[1]} strokeWidth={2} dot />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ClientChart>
      </Card>
      <Card className="mt-5 overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">ماه</th>
                <th className="px-4 py-2.5 text-left font-medium">کل تولید</th>
                <th className="px-4 py-2.5 text-left font-medium">A</th>
                <th className="px-4 py-2.5 text-left font-medium">B</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ B</th>
                <th className="px-4 py-2.5 text-left font-medium">سهم از B</th>
                <th className="px-4 py-2.5 text-left font-medium">تغییر نرخ</th>
              </tr>
            </thead>
            <tbody>
              {GRADE.months.map((m) => (
                <tr key={m.code} className="border-t border-border">
                  <td className="px-4 py-3">{m.name}</td>
                  <td className="px-4 py-3 text-left tabular">{faNum(m.total, 0)}</td>
                  <td className="px-4 py-3 text-left tabular">{faNum(m.a, 0)}</td>
                  <td className="px-4 py-3 text-left tabular">{faNum(m.b, 0)}</td>
                  <td className="px-4 py-3 text-left tabular">{formatRate(m.rate)}</td>
                  <td className="px-4 py-3 text-left tabular">{formatRate(m.share, 1)}</td>
                  <td className="px-4 py-3 text-left tabular">{formatPp(m.delta)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
