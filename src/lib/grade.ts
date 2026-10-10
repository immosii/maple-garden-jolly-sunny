import dash from "@/data/grade.json";
import rows from "@/data/grade-rows.json";

export type GradeMonth = {
  name: string;
  code: string;
  total: number;
  a: number;
  b: number;
  rate: number;
  share: number;
  delta: number | null;
};

export type GradeModel = {
  code: string;
  name: string;
  total: number;
  a: number;
  b: number;
  rate: number;
  share: number;
  rank: number;
  cum: number;
};

export type GradeFamily = {
  name: string;
  total: number;
  a: number;
  b: number;
  rate: number;
  share: number;
};

export type GradeMatrix = {
  code: string;
  name: string;
  b: number;
  cells: { month: string; total: number; b: number }[];
};

export type GradeOrder = {
  order: string;
  total: number;
  a: number;
  b: number;
  rate: number;
};

export type GradeNote = { topic: string; body: string };

export type GradeRow = {
  g: string;
  s: string;
  n: string;
  c: string;
  o: string;
  d: string;
  f: string;
};

type Dash = {
  summary: { label: string; value: string | number; note: string }[];
  months: GradeMonth[];
  models: GradeModel[];
  families: GradeFamily[];
  matrix: GradeMatrix[];
  orders: GradeOrder[];
  guide: GradeNote[];
};

export const GRADE = dash as Dash;
export const GRADE_ROWS = rows as GradeRow[];
export const MONTHS = GRADE.months.map((m) => m.name);
