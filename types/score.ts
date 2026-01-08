export type PlanType = "monthly" | "annual";

export type ScoreInput = {
  daysSincePayment: number;
  planType: PlanType;
  tenureMonths: number;
  tenants: number;
  invoices: number;
  payments: number;
  messages: number;
};

export type ScoreDisplay = {
  payHealthPercent: number;
  tenureHealthPercent: number;
  engagementHealthPercent: number;
  overallHealthPercent: number;
};

export type ScoreResult = {
  pay: number;
  tenure: number;
  engagement: number;
  rawScore: number;
  healthScore: number;
  status: "Healthy" | "At-Risk" | "Critical";
  display: ScoreDisplay;
};

