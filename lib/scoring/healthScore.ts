import { clamp, engagementScore, payRecencyScore, tenureScore } from "@/lib/scoring/formulas";
import { WEIGHTS } from "@/lib/scoring/weights";
import type { ScoreInput, ScoreResult } from "@/types/score";

const toPercent = (value: number) => Math.round(clamp(value) * 100);

export function calculateHealthScore(input: ScoreInput): ScoreResult {
  const pay = payRecencyScore(input.daysSincePayment, input.planType);
  const tenure = tenureScore(input.tenureMonths);
  const engagement = engagementScore({
    tenants: input.tenants,
    invoices: input.invoices,
    payments: input.payments,
    messages: input.messages,
  });

  const rawScore =
    WEIGHTS.payRecency * pay +
    WEIGHTS.tenure * tenure +
    WEIGHTS.engagement * engagement;

  const healthScore = Number((10 * (1 - rawScore)).toFixed(1));

  let status: ScoreResult["status"];
  if (healthScore >= 7) status = "Healthy";
  else if (healthScore >= 3) status = "At-Risk";
  else status = "Critical";

  return {
    pay,
    tenure,
    engagement,
    rawScore,
    healthScore,
    status,
    display: {
      payHealthPercent: toPercent(1 - pay),
      tenureHealthPercent: toPercent(1 - tenure),
      engagementHealthPercent: toPercent(1 - engagement),
      overallHealthPercent: toPercent(healthScore / 10),
    },
  };
}

