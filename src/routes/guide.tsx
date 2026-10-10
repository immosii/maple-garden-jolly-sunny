import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { GRADE } from "@/lib/grade";

export const Route = createFileRoute("/guide")({ component: GuidePage });

function GuidePage() {
  return (
    <div>
      <PageHeader title="راهنمای مدیریتی" kicker="نحوه خواندن شاخص‌ها" />
      <div className="grid gap-3">
        {GRADE.guide.map((g) => (
          <Card key={g.topic} className="rounded-lg p-4">
            <h2 className="text-sm font-medium">{g.topic}</h2>
            <p className="mt-2 text-sm leading-7 text-fg-muted">{g.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
