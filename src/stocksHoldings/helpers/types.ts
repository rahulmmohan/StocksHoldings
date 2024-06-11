export type UserHolding = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
};

export type ComputedUserHolding = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
  pAndL: number;
  currentValue: number;
  investmentValue: number;
};

export type SummaryViewProps = {
  holdingSummary: {
    totalInvestment: number;
    totalPandL: number;
    todaysTotalPandL: number;
    totalCurrentValue: number;
  };
  isSummaryExpanded: boolean;
  toggleView: () => void;
};
