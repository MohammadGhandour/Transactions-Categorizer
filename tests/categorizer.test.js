const { categorizeTransaction, CATEGORIES } = require('../src/categorizer');

describe('Transaction Categorizer', () => {
  test('should throw error for missing transaction', () => {
    expect(() => categorizeTransaction()).toThrow('Transaction object is required');
  });

  test('should return default category for unknown transaction', () => {
    const transaction = {
      name: 'UNKNOWN MERCHANT',
      amount: -10.00,
      type: 'card'
    };

    const result = categorizeTransaction(transaction);
    
    expect(result).toEqual({
      category: 'Other',
      subCategory: 'Uncategorized'
    });
  });

  test('should have all required categories', () => {
    expect(CATEGORIES).toBeDefined();
    expect(CATEGORIES.length).toBeGreaterThan(0);
    
    const categoryNames = CATEGORIES.map(cat => cat.category);
    expect(categoryNames).toContain('Income');
    expect(categoryNames).toContain('Food & Drinks');
    expect(categoryNames).toContain('Transport');
  });
});