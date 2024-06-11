import {ComputedUserHolding, UserHolding} from './types';
import currencyFormatter from 'currency-formatter';

export default class StocksUtils {
  static calculatePandL = (
    currentValue: number,
    investmentValue: number,
  ): number => {
    return currentValue - investmentValue;
  };

  static calculateCurrentValue = (ltp: number, quantity: number): number => {
    return ltp * quantity;
  };

  static calculateInvestmentValue = (avg: number, quantity: number): number => {
    return avg * quantity;
  };

  static calculateTodayPandL = (
    close: number,
    ltp: number,
    quantity: number,
  ): number => {
    return (close - ltp) * quantity;
  };

  static getComputedHoldingValues = (
    holdings: UserHolding[],
  ): {
    computedHoldings: ComputedUserHolding[];
    totalInvestment: number;
    totalPandL: number;
    todaysTotalPandL: number;
    totalCurrentValue: number;
  } => {
    var totalCurrentValue = 0;
    var totalInvestment = 0;
    var todaysTotalPandL = 0;

    const computedHoldings = holdings.map((item: UserHolding) => {
      const currentValue = this.calculateCurrentValue(item.ltp, item.quantity);
      const investmentValue = this.calculateInvestmentValue(
        item.avgPrice,
        item.quantity,
      );
      const pAndL = this.calculatePandL(currentValue, investmentValue);

      totalCurrentValue += currentValue;
      totalInvestment += investmentValue;
      todaysTotalPandL += this.calculateTodayPandL(
        item.close,
        item.ltp,
        item.quantity,
      );
      return {
        ...item,
        pAndL,
        currentValue,
        investmentValue,
      } as ComputedUserHolding;
    });

    return {
      computedHoldings,
      totalInvestment,
      totalPandL: totalCurrentValue - totalInvestment,
      todaysTotalPandL,
      totalCurrentValue,
    };
  };

  static getFormattedAmount = (amount: number): string => {
    const formattedAmount = currencyFormatter.format(amount, {
      symbol: '₹ ',
      decimalSeparator: 2,
    });
    return formattedAmount;
  };
}
