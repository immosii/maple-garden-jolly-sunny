import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { faNum, formatRate } from "@/lib/format";
import { GRADE } from "@/lib/grade";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const [q, setQ] = useState("");
  const [onlyB, setOnlyB] = useState(true);
  const rows = useMemo(() => {
    return GRADE.orders.filter((o) => {
      if (onlyB && o.b === 0) return false;
      if (q.trim() && !o.order.includes(q.trim())) return false;
      return true;
    });
  }, [q, onlyB]);

  return (
    <div>
      <PageHeader title="تحلیل سفارش تولید" kicker={`${faNum(rows.length, 0)} سفارش`}>
        <div className="flex gap-2">
          <Input className="h-9 w-40" placeholder="شماره سفارش" value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="button" className="h-9 rounded-md bg-bg-subtle px-3 text-xs" onClick={() => setOnlyB((v) => !v)}>
            {onlyB ? "همه سفارش‌ها" : "فقط دارای B"}
          </button>
        </div>
      </PageHeader>
      <Card className="overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">سفارش</th>
                <th className="px-4 py-2.5 text-left font-medium">کل تولید</th>
                <th className="px-4 py-2.5 text-left font-medium">A</th>
                <th className="px-4 py-2.5 text-left font-medium">B</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ B</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.order} className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs">{o.order}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(o.total, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(o.a, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(o.b, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatRate(o.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
