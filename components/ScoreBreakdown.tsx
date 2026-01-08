import type { ScoreResult } from "@/types/score";
import type { WEIGHTS } from "@/lib/scoring/weights";

type Props = {
  scores: ScoreResult;
  weights: typeof WEIGHTS;
};

const SUBTEXT =
  "Higher bars mean healthier behavior. Weights show how much each factor influences the final score.";

export function ScoreBreakdown({ scores, weights }: Props) {
  const items = [
    {
      id: "pay",
      label: "Pay Recency",
      percent: scores.display.payHealthPercent,
      weight: weights.payRecency,
      helper: "Recent payments drive confidence. Overdue invoices lower this bar.",
    },
    {
      id: "tenure",
      label: "Tenure",
      percent: scores.display.tenureHealthPercent,
      weight: weights.tenure,
      helper: "Longer relationships are more resilient. New accounts are riskier.",
    },
    {
      id: "engagement",
      label: "Engagement",
      percent: scores.display.engagementHealthPercent,
      weight: weights.engagement,
      helper: "Invoices, payments, and messages per tenant indicate adoption.",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Score Breakdown</p>
          <p className="text-sm text-slate-500">{SUBTEXT}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Raw risk: {scores.rawScore.toFixed(2)}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 shadow-inner"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>{item.label}</span>
              <span className="text-xs font-medium text-slate-500">
                Weight {Math.round(item.weight * 100)}%
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="min-w-[3rem] text-right text-sm font-semibold text-slate-800">
                {item.percent}%
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">{item.helper}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

