"use client";

import { useMemo, useState } from "react";
import { HealthBadge } from "@/components/HealthBadge";
import { Inputs } from "@/components/Inputs";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { calculateHealthScore } from "@/lib/scoring/healthScore";
import { WEIGHTS } from "@/lib/scoring/weights";
import type { ScoreInput } from "@/types/score";

const DEFAULT_INPUT: ScoreInput = {
  daysSincePayment: 45,
  planType: "monthly",
  tenureMonths: 6,
  tenants: 12,
  invoices: 15,
  payments: 10,
  messages: 45,
};

export default function Home() {
  const [input, setInput] = useState<ScoreInput>(DEFAULT_INPUT);
  const scores = useMemo(() => calculateHealthScore(input), [input]);

  const handleChange = (update: Partial<ScoreInput>) => {
    setInput((prev) => ({ ...prev, ...update }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 flex flex-col gap-4">
          <div className="inline-flex max-w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Real-time Account Health Workbench
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Pressure-test your scoring model before it ships
            </h1>
            <p className="max-w-3xl text-lg text-slate-600">
              Adjust inputs, see weighted risk, and share a single link. All
              scoring logic lives in one file so product and data teams can tune
              formulas without touching the UI.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.6fr]">
          <Inputs values={input} onChange={handleChange} />

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Final Account Health Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {scores.healthScore.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">
                      /10
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Lower raw risk = higher health score.
                  </p>
                </div>
                <HealthBadge status={scores.status} />
              </div>

              <div className="mt-5">
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${scores.display.overallHealthPercent}%` }}
                  />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-600">
                  {scores.display.overallHealthPercent}% healthy
                </div>
              </div>
            </div>

            <ScoreBreakdown scores={scores} weights={WEIGHTS} />
          </div>
        </div>
      </div>
    </div>
  );
}
