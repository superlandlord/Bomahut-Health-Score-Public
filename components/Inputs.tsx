import type { ChangeEvent } from "react";
import type { ScoreInput } from "@/types/score";

type Props = {
  values: ScoreInput;
  onChange: (update: Partial<ScoreInput>) => void;
};

type NumericField = {
  key: keyof ScoreInput;
  label: string;
  min: number;
  max: number;
  step?: number;
  helper?: string;
};

const numericFields: NumericField[] = [
  {
    key: "daysSincePayment",
    label: "Days since last payment",
    min: 0,
    max: 365,
    helper: "More days = higher risk of churn.",
  },
  {
    key: "tenureMonths",
    label: "Tenure (months)",
    min: 0,
    max: 60,
    helper: "Longer tenure usually lowers churn risk.",
  },
  {
    key: "tenants",
    label: "Number of tenants",
    min: 0,
    max: 200,
    helper: "Used to normalize engagement per tenant.",
  },
  {
    key: "invoices",
    label: "Invoices created (last 35 days)",
    min: 0,
    max: 200,
  },
  {
    key: "payments",
    label: "Payments recorded",
    min: 0,
    max: 200,
  },
  {
    key: "messages",
    label: "Messages sent",
    min: 0,
    max: 400,
  },
];

export function Inputs({ values, onChange }: Props) {
  const handleNumberChange =
    (field: keyof ScoreInput) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);
      onChange({ [field]: Number.isNaN(nextValue) ? 0 : nextValue });
    };

  const handlePlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({ planType: event.target.value as ScoreInput["planType"] });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Inputs</p>
          <p className="text-sm text-slate-500">
            Move sliders or type values. The score updates instantly.
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Client-side only
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            Plan type
          </label>
          <select
            value={values.planType}
            onChange={handlePlanChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
          <p className="text-xs text-slate-500">
            Annual accounts tolerate longer gaps between payments.
          </p>
        </div>

        {numericFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                {field.label}
              </label>
              <input
                type="number"
                min={field.min}
                max={field.max}
                step={field.step ?? 1}
                value={values[field.key]}
                onChange={handleNumberChange(field.key)}
                className="w-28 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step ?? 1}
              value={values[field.key]}
              onChange={handleNumberChange(field.key)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
            />
            {field.helper && (
              <p className="text-xs text-slate-500">{field.helper}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

