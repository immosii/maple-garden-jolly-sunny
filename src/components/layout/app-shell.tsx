import { Menu } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { COMPANY } from "@/lib/company";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Toaster position="top-center" dir="rtl" richColors={false} />
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-5">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-sm hover:bg-bg-subtle lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="منو"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="truncate text-sm font-medium">{COMPANY.legal}</span>
              <span className="hidden text-[11px] text-fg-subtle sm:inline">{COMPANY.desk}</span>
            </div>
            <p className="text-[11px] text-fg-muted">{COMPANY.periodLabel}</p>
          </div>
        </div>
      </header>
      <div className="lg:grid lg:grid-cols-[15.5rem_1fr]">
        <aside className="sticky top-[57px] hidden h-[calc(100dvh-57px)] border-l border-border bg-bg-elevated lg:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 px-3 py-5 sm:px-6 sm:py-7">{children}</main>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[17rem] bg-bg-elevated p-0">
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
