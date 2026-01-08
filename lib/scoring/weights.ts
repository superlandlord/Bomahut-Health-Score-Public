export const WEIGHTS = {
  payRecency: 0.4,
  tenure: 0.2,
  engagement: 0.4,
  engagementSplit: {
    invoices: 0.5,
    payments: 0.3,
    messages: 0.2,
  },
} as const;

