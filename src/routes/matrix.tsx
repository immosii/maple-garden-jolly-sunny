import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { faNum } from "@/lib/format";
import { GRADE, MONTHS } from "@/lib/grade";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matrix")({ component: MatrixPage });

function MatrixPage() {
  const [onlyB, setOnlyB] = useState(true);
  const rows = GRADE.matrix.filter((r) => (onlyB ? r.b > 0 : true));
  const max = Math.max(1, ...GRADE.matrix.flatMap((r) => r.cells.map((c) => c.b)));

  return (
    <div>
      <PageHeader title="ماتریس مدل و ماه" kicker="تعداد گرید B">
        <button type="button" className="h-9 rounded-md bg-bg-subtle px-3 text-xs" onClick={() => setOnlyB((v) => !v)}>
          {onlyB ? "نمایش همه مدل‌ها" : "فقط مدل‌های دارای B"}
        </button>
      </PageHeader>
      <Card className="overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-xs">
            <thead className="bg-bg-subtle text-fg-muted">
              <tr>
                <th className="px-3 py-2 text-right font-medium">مدل</th>
                {MONTHS.map((m) => (
                  <th key={m} className="px-2 py-2 text-center font-medium">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code} className="border-t border-border">
                  <td className="max-w-[16rem] px-3 py-2">
                    <div className="truncate">{r.name}</div>
                    <div className="font-mono text-[10px] text-fg-subtle">{r.code}</div>
                  </td>
                  {r.cells.map((c) => (
                    <td key={c.month} className="px-1 py-1 text-center">
                      <span
                        className={cn("inline-flex min-w-10 flex-col items-center rounded-sm px-1 py-1 tabular")}
                        style={{
                          background: c.b === 0 ? "transparent" : `color-mix(in oklab, var(--color-danger) ${Math.max(16, (c.b / max) * 100)}%, transparent)`,
                        }}
                        title={`تولید ${c.total}`}
                      >
                        <span>{c.b ? faNum(c.b, 0) : "—"}</span>
                        <span className="text-[10px] text-fg-subtle">{c.total ? faNum(c.total, 0) : ""}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="mt-2 text-[11px] text-fg-muted">عدد بالا گرید B است و عدد کوچک‌تر کل تولید همان ماه.</p>
    </div>
  );
}
