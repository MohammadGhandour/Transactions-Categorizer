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

  test('should categorize Starbucks as Bars & Cafés', () => {
    const transaction = { name: 'STARBUCKS COFFEE', amount: -4.50, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Food & Drinks', subCategory: 'Bars & Cafés' });
  });

  test('should categorize McDonald\'s as Restaurants', () => {
    const transaction = { name: 'Mc Donald\'s', amount: -33.00, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Food & Drinks', subCategory: 'Restaurants' });
  });

  test('should categorize Lidl as Groceries', () => {
    const transaction = { name: 'CARTE 21/07/25 LIDL LAGNY LE SEC CB*8934', amount: -20.01, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Food & Drinks', subCategory: 'Groceries' });
  });

  test('should categorize Amazon as Shopping Others', () => {
    const transaction = { name: 'Amazon Eu Sarl', amount: -199.00, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Shopping & Retail', subCategory: 'Others' });
  });

  test('should categorize IKEA as Furniture & Houseware', () => {
    const transaction = { name: '120225 CB****5631 IKEA THIAIS 94THIAIS', amount: -39.98, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Shopping & Retail', subCategory: 'Furniture & Houseware' });
  });

  test('should categorize gas station as Gas', () => {
    const transaction = { name: 'CARTE 19/09/22 72 STATION TOTAL CB*3973', amount: -50.83, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Transport', subCategory: 'Gas' });
  });

  test('should categorize ATM withdrawal', () => {
    const transaction = { name: 'RETRAIT DAB 24/06/20 68COLMAR CB*3786', amount: -20.00, type: 'withdrawal' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Cash', subCategory: 'ATM withdrawal' });
  });

  test('should categorize positive amount as Income', () => {
    const transaction = { name: 'VIR SEPA C.P.A.M. CHARTRES', amount: 120.38, type: 'transfer' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Income', subCategory: 'Other' });
  });

  test('should categorize refund as Income Refund', () => {
    const transaction = { name: 'AVOIR 30/05/25 TEMU.COM 12,69 EU CB*7111', amount: 12.69, type: 'payback' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Income', subCategory: 'Refund' });
  });

  test('should categorize internal transfer as Self transfer', () => {
    const transaction = { name: 'VIR Virement interne depuis BoursoBank', amount: -20.00, type: 'transfer' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Transfers', subCategory: 'Self transfer' });
  });

  test('should categorize phone bill as Phone', () => {
    const transaction = { name: 'PRLV SEPA BOUYGUES TELECOM 06xxxxx098', amount: -30.99, type: 'order' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Housing & Utilities', subCategory: 'Phone' });
  });

  test('should categorize pharmacy as Pharmacy', () => {
    const transaction = { name: 'CARTE 03/01/25 PHARMA ECOLES 2 CB*4151', amount: -8.90, type: 'card' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Health', subCategory: 'Pharmacy' });
  });

  test('should categorize bank fee as Fees & Charges', () => {
    const transaction = { name: '*FRAIS BOURSORAMA PROTEC. MONO', amount: -0.99, type: 'bank' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Financial', subCategory: 'Fees & Charges' });
  });

  test('should handle missing transaction fields gracefully', () => {
    const transaction = { name: 'UNKNOWN MERCHANT' };
    const result = categorizeTransaction(transaction);
    expect(result).toEqual({ category: 'Other', subCategory: 'Uncategorized' });
  });
});
