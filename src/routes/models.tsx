import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { faNum, formatRate } from "@/lib/format";
import { GRADE } from "@/lib/grade";

export const Route = createFileRoute("/models")({ component: ModelsPage });

function ModelsPage() {
  const [q, setQ] = useState("");
  const [onlyB, setOnlyB] = useState(false);
  const rows = useMemo(() => {
    const query = q.trim();
    return GRADE.models.filter((m) => {
      if (onlyB && m.b === 0) return false;
      if (!query) return true;
      return m.name.includes(query) || m.code.includes(query);
    });
  }, [q, onlyB]);

  return (
    <div>
      <PageHeader title="تحلیل مدل محصول" kicker="۳۷ مدل">
        <div className="flex flex-wrap items-center gap-2">
          <Input className="h-9 w-56" placeholder="نام یا کد مدل" value={q} onChange={(e) => setQ(e.target.value)} />
          <button
            type="button"
            className="h-9 rounded-md bg-bg-subtle px-3 text-xs"
            onClick={() => setOnlyB((v) => !v)}
          >
            {onlyB ? "نمایش همه" : "فقط دارای B"}
          </button>
        </div>
      </PageHeader>
      <Card className="overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">رتبه</th>
                <th className="px-4 py-2.5 text-right font-medium">کد</th>
                <th className="px-4 py-2.5 text-right font-medium">نام</th>
                <th className="px-4 py-2.5 text-left font-medium">تولید</th>
                <th className="px-4 py-2.5 text-left font-medium">A</th>
                <th className="px-4 py-2.5 text-left font-medium">B</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ</th>
                <th className="px-4 py-2.5 text-left font-medium">سهم B</th>
                <th className="px-4 py-2.5 text-left font-medium">تجمعی</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.code} className="border-t border-border">
                  <td className="px-4 py-2.5 tabular">{faNum(m.rank, 0)}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{m.code}</td>
                  <td className="px-4 py-2.5">{m.name}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(m.total, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(m.a, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(m.b, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatRate(m.rate)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatRate(m.share, 1)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatRate(m.cum, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
