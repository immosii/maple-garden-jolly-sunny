import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { faNum } from "@/lib/format";
import { toFaDigits } from "@/lib/jalali";
import { GRADE_ROWS } from "@/lib/grade";

export const Route = createFileRoute("/records")({ component: RecordsPage });

function RecordsPage() {
  const [grade, setGrade] = useState<"B" | "all">("B");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const filtered = useMemo(() => {
    const query = q.trim();
    return GRADE_ROWS.filter((r) => {
      if (grade === "B" && r.g !== "B") return false;
      if (!query) return true;
      return [r.s, r.n, r.c, r.o, r.f, r.d].some((v) => v.includes(query));
    });
  }, [grade, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      <PageHeader title="داده‌های مبنا" kicker={`${faNum(GRADE_ROWS.length, 0)} ردیف`}>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="h-9 rounded-md bg-bg-subtle px-3 text-xs" onClick={() => { setGrade((g) => (g === "B" ? "all" : "B")); setPage(0); }}>
            {grade === "B" ? "نمایش همه گریدها" : "فقط گرید B"}
          </button>
          <Input
            className="h-9 w-56"
            placeholder="سریال، مدل، سفارش…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(0); }}
          />
        </div>
      </PageHeader>
      <Card className="rounded-lg p-4">
        <CardTitle>{faNum(filtered.length, 0)} ردیف</CardTitle>
        <CardHint>ستون‌ها همان شیت داده‌های مبنا هستند.</CardHint>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead className="text-xs text-fg-muted">
              <tr>
                <th className="pb-2 text-right font-medium">درجه</th>
                <th className="pb-2 text-right font-medium">سریال</th>
                <th className="pb-2 text-right font-medium">نام</th>
                <th className="pb-2 text-right font-medium">خانواده</th>
                <th className="pb-2 text-left font-medium">سفارش</th>
                <th className="pb-2 text-left font-medium">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((r) => (
                <tr key={`${r.s}-${r.d}`} className="border-t border-border">
                  <td className="py-2.5">{r.g}</td>
                  <td className="py-2.5 font-mono text-xs">{r.s}</td>
                  <td className="py-2.5 text-xs">{r.n}</td>
                  <td className="py-2.5 text-xs">{r.f}</td>
                  <td className="py-2.5 text-left tabular">{r.o}</td>
                  <td className="py-2.5 text-left text-xs">{toFaDigits(r.d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-fg-muted">
          <span>صفحه {faNum(page + 1, 0)} از {faNum(pages, 0)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>بعدی</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
