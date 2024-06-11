import StocksUtils from '../src/stocksHoldings/helpers/StockUtils';

describe('calculateCurrentValue', () => {
  it('should return 100000 for ltp:10000 and quantity:10 ', () => {
    expect(StocksUtils.calculateCurrentValue(10000, 10)).toEqual(100000);
  });

  it('should return 12340 for ltp:1234 and quantity:10 ', () => {
    expect(StocksUtils.calculateCurrentValue(1234, 10)).toEqual(12340);
  });

  it('should return 1000 for ltp:500 and quantity:2 ', () => {
    expect(StocksUtils.calculateCurrentValue(500, 2)).toEqual(1000);
  });
});

describe('calculateInvestmentValue', () => {
  it('should return 100000 for avg:10000 and quantity:10 ', () => {
    expect(StocksUtils.calculateInvestmentValue(10000, 10)).toEqual(100000);
  });

  it('should return 12340 for avg:1234 and quantity:10 ', () => {
    expect(StocksUtils.calculateInvestmentValue(1234, 10)).toEqual(12340);
  });

  it('should return 1000 for avg:500 and quantity:2 ', () => {
    expect(StocksUtils.calculateInvestmentValue(500, 2)).toEqual(1000);
  });
});

describe('calculatePandL', () => {
  it('should return 90 for currentValue:100 and investmentValue:10 ', () => {
    expect(StocksUtils.calculatePandL(100, 10)).toEqual(90);
  });

  it('should return 1224 for currentValue:1234 and investmentValue:10 ', () => {
    expect(StocksUtils.calculatePandL(1234, 10)).toEqual(1224);
  });

  it('should return 300 for currentValue:500 and investmentValue:200 ', () => {
    expect(StocksUtils.calculatePandL(500, 200)).toEqual(300);
  });
});

describe('calculateTodayPandL', () => {
  it('should return 50000 for close:15000, ltp:10000 and quantity:10 ', () => {
    expect(StocksUtils.calculateTodayPandL(15000, 10000, 10)).toEqual(50000);
  });

  it('should return 7660 for close:2000, ltp:1234 and quantity:10 ', () => {
    expect(StocksUtils.calculateTodayPandL(2000, 1234, 10)).toEqual(7660);
  });

  it('should return 1000 for close:1000, ltp:500 and quantity:2 ', () => {
    expect(StocksUtils.calculateTodayPandL(1000, 500, 2)).toEqual(1000);
  });
});