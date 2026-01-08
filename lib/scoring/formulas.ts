import { WEIGHTS } from "@/lib/scoring/weights";

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export function payRecencyScore(
  daysSincePayment: number,
  planType: "monthly" | "annual",
) {
  if (planType === "monthly") {
    return clamp((daysSincePayment - 30) / 70);
  }

  return clamp(daysSincePayment / 365);
}

export function tenureScore(months: number) {
  return clamp(1 / (1 + months));
}

export function engagementScore({
  tenants,
  invoices,
  payments,
  messages,
}: {
  tenants: number;
  invoices: number;
  payments: number;
  messages: number;
}) {
  if (tenants === 0) return 1;

  const invoiceRatio = clamp(invoices / tenants);
  const paymentRatio = clamp(payments / tenants);
  const messageRatio = clamp(messages / tenants);

  const engagementHealth =
    WEIGHTS.engagementSplit.invoices * invoiceRatio +
    WEIGHTS.engagementSplit.payments * paymentRatio +
    WEIGHTS.engagementSplit.messages * messageRatio;

  return 1 - engagementHealth;
}

