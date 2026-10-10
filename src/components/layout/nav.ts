import {
  CalendarRange,
  Factory,
  FileSpreadsheet,
  Grid3x3,
  LayoutDashboard,
  Layers,
  Package,
  ScrollText,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "خلاصه مدیریتی", icon: LayoutDashboard },
  { to: "/months", label: "روند ماهانه", icon: CalendarRange },
  { to: "/models", label: "مدل محصول", icon: Package },
  { to: "/families", label: "خانواده محصول", icon: Layers },
  { to: "/matrix", label: "ماتریس مدل-ماه", icon: Grid3x3 },
  { to: "/orders", label: "سفارش تولید", icon: Factory },
  { to: "/records", label: "داده‌های مبنا", icon: FileSpreadsheet },
  { to: "/guide", label: "راهنمای مدیریتی", icon: ScrollText },
] as const;
