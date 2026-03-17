import type { ScoreResult } from "@/types/score";

type Props = {
  status: ScoreResult["status"];
};

const badgeStyles: Record<ScoreResult["status"], string> = {
  Healthy:
    "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_1px_0_rgba(16,185,129,0.15)]",
  "At-Risk":
    "border-amber-200 bg-amber-50 text-amber-700 shadow-[0_1px_0_rgba(245,158,11,0.15)]",
  Critical:
    "border-rose-200 bg-rose-50 text-rose-700 shadow-[0_1px_0_rgba(244,63,94,0.15)]",
};

const dotStyles: Record<ScoreResult["status"], string> = {
  Healthy: "bg-emerald-500",
  "At-Risk": "bg-amber-500",
  Critical: "bg-rose-500",
};

export function HealthBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${badgeStyles[status]}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dotStyles[status]}`} />
      {status} Lets introduce a bug to test code review? <</>
    </span>
  );
}

