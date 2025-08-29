/**
 * Transaction Categorizer
 * Categorizes financial transactions based on name, amount, and type
 */

// Categories and subcategories configuration
const CATEGORIES = [
  {
    category: 'Income',
    subCategories: [
      'Salary',
      'Bonus',
      'Refund',
      'Interest & Dividend',
      'Rent',
      'Business income',
      'Other'
    ]
  },
  {
    category: 'Transfers',
    subCategories: [
      'Self transfer',
      'External transfer',
      'Charity & Donations'
    ]
  },
  {
    category: 'Food & Drinks',
    subCategories: [
      'Groceries',
      'Restaurants',
      'Bars & Cafés'
    ]
  },
  {
    category: 'Transport',
    subCategories: [
      'Auto payment',
      'Public transit',
      'Gas',
      'Auto maintenance',
      'Auto Wash',
      'Parking & Tolls',
      'Taxi/VTC',
      'Car rental'
    ]
  },
  {
    category: 'Housing & Utilities',
    subCategories: [
      'Mortgage',
      'Rent',
      'Home improvement',
      'Garbage',
      'Water',
      'Gas & Electricity',
      'Internet & Cable',
      'Phone',
      'Others'
    ]
  },
  {
    category: 'Shopping & Retail',
    subCategories: [
      'Gifts',
      'Electronics',
      'Clothing',
      'Pets',
      'Furniture & Houseware',
      'Others'
    ]
  },
  {
    category: 'Health',
    subCategories: [
      'Doctor',
      'Pharmacy',
      'Dentist',
      'Insurance',
      'Social Security'
    ]
  },
  {
    category: 'Leisure & Entertainment',
    subCategories: [
      'Gaming',
      'Subscriptions',
      'Sports',
      'Cultural',
      'Hobbies',
      'Wellness'
    ]
  },
  {
    category: 'Travel',
    subCategories: [
      'Flights',
      'Hotels',
      'Vacation'
    ]
  },
  {
    category: 'Financial',
    subCategories: [
      'Fees & Charges',
      'Investments',
      'Loan',
      'Taxes',
      'Fines',
      'Financial & Legal services',
      'Insurance'
    ]
  },
  {
    category: 'Cash',
    subCategories: [
      'ATM withdrawal',
      'Cash deposit',
      'Check deposit'
    ]
  },
  {
    category: 'Business spending',
    subCategories: [
      'Advertising & Promotion',
      'Business Utilities & Communication',
      'Employee Wages & Contract Labor',
      'Business Travel & Meals',
      'Business Auto expenses',
      'Business Insurance',
      'Office Supplies & Expenses',
      'Office Rent',
      'Postage & Shipping'
    ]
  },
  {
    category: 'Other',
    subCategories: [
      'Uncategorized',
      'Miscellaneous'
    ]
  }
];

/**
 * Categorizes a transaction based on its name, amount, and type
 * @param {Object} transaction - The transaction object
 * @param {string} transaction.name - The transaction name/description
 * @param {number} transaction.amount - The transaction amount
 * @param {string} transaction.type - The transaction type
 * @returns {Object} - Object containing category and subCategory
 */
function categorizeTransaction(transaction) {
  // TODO: Implement categorization logic
  // For now, just validate the transaction object exists
  if (!transaction) {
    throw new Error('Transaction object is required');
  }

  return {
    category: 'Other',
    subCategory: 'Uncategorized'
  };
}

module.exports = {
  categorizeTransaction,
  CATEGORIES
};
