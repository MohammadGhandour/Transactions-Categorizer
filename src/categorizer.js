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
  if (!transaction) {
    throw new Error('Transaction object is required');
  }

  const { name = '', amount = 0, type = '' } = transaction;
  const normalizedName = name.toLowerCase();

  if (amount > 0) {
    return categorizeIncome(normalizedName);
  }

  const typeResult = categorizeByType(type, normalizedName);
  if (typeResult) return typeResult;

  const nameResult = categorizeByName(normalizedName);
  if (nameResult) return nameResult;

  return {
    category: 'Other',
    subCategory: 'Uncategorized'
  };
}

function categorizeIncome(name) {
  if (name.includes('salary') || name.includes('salaire')) {
    return { category: 'Income', subCategory: 'Salary' };
  }
  if (name.includes('bonus') || name.includes('prime')) {
    return { category: 'Income', subCategory: 'Bonus' };
  }
  if (name.includes('refund') || name.includes('avoir') || name.includes('rembt')) {
    return { category: 'Income', subCategory: 'Refund' };
  }
  if (name.includes('interest') || name.includes('dividend') || name.includes('cashback')) {
    return { category: 'Income', subCategory: 'Interest & Dividend' };
  }
  if (name.includes('rent') || name.includes('loyer')) {
    return { category: 'Income', subCategory: 'Rent' };
  }
  return { category: 'Income', subCategory: 'Other' };
}

function categorizeByType(type, name) {
  if (type === 'withdrawal' && (name.includes('retrait') || name.includes('dab') || name.includes('atm'))) {
    return { category: 'Cash', subCategory: 'ATM withdrawal' };
  }
  if (type === 'deposit') {
    if (name.includes('cash')) return { category: 'Cash', subCategory: 'Cash deposit' };
    if (name.includes('check') || name.includes('cheque')) return { category: 'Cash', subCategory: 'Check deposit' };
  }
  if (type === 'transfer') {
    if (name.includes('charity') || name.includes('donation') || name.includes('don ')) {
      return { category: 'Transfers', subCategory: 'Charity & Donations' };
    }
    if (name.includes('virement interne') || name.includes('self') || name.includes('compte')) {
      return { category: 'Transfers', subCategory: 'Self transfer' };
    }
    return { category: 'Transfers', subCategory: 'External transfer' };
  }
  if (type === 'fee' || type === 'bank') {
    return { category: 'Financial', subCategory: 'Fees & Charges' };
  }
  return null;
}

function categorizeByName(name) {
  if (name.includes('starbucks') || name.includes('cafe') || name.includes('bar ') || 
      name.includes('restaurant') || name.includes('mcdonald') || name.includes('mc donald') || name.includes('uber eats')) {
    if (name.includes('starbucks') || name.includes('cafe') || name.includes('bar ')) {
      return { category: 'Food & Drinks', subCategory: 'Bars & Cafés' };
    }
    return { category: 'Food & Drinks', subCategory: 'Restaurants' };
  }
  if (name.includes('carrefour') || name.includes('leclerc') || name.includes('lidl') || 
      name.includes('supermarche') || name.includes('groceries')) {
    return { category: 'Food & Drinks', subCategory: 'Groceries' };
  }

  if (name.includes('amazon') || name.includes('zara') || name.includes('h&m') || 
      name.includes('clothing') || name.includes('electronics')) {
    if (name.includes('clothing') || name.includes('zara') || name.includes('h&m')) {
      return { category: 'Shopping & Retail', subCategory: 'Clothing' };
    }
    if (name.includes('electronics') || name.includes('apple')) {
      return { category: 'Shopping & Retail', subCategory: 'Electronics' };
    }
    return { category: 'Shopping & Retail', subCategory: 'Others' };
  }
  if (name.includes('ikea') || name.includes('furniture')) {
    return { category: 'Shopping & Retail', subCategory: 'Furniture & Houseware' };
  }

  if (name.includes('station') || name.includes('total') || name.includes('gas') || name.includes('essence')) {
    return { category: 'Transport', subCategory: 'Gas' };
  }
  if (name.includes('parking') || name.includes('toll') || name.includes('peage')) {
    return { category: 'Transport', subCategory: 'Parking & Tolls' };
  }
  if (name.includes('taxi') || name.includes('uber') || name.includes('vtc')) {
    return { category: 'Transport', subCategory: 'Taxi/VTC' };
  }

  if (name.includes('bouygues') || name.includes('orange') || name.includes('sfr') || name.includes('phone')) {
    return { category: 'Housing & Utilities', subCategory: 'Phone' };
  }
  if (name.includes('totalenergies') || name.includes('edf') || name.includes('gas') || name.includes('electricity')) {
    return { category: 'Housing & Utilities', subCategory: 'Gas & Electricity' };
  }
  if (name.includes('internet') || name.includes('cable') || name.includes('wifi')) {
    return { category: 'Housing & Utilities', subCategory: 'Internet & Cable' };
  }

  if (name.includes('pharma') || name.includes('pharmacy') || name.includes('medicament')) {
    return { category: 'Health', subCategory: 'Pharmacy' };
  }
  if (name.includes('doctor') || name.includes('medecin') || name.includes('doctolib')) {
    return { category: 'Health', subCategory: 'Doctor' };
  }
  if (name.includes('dentist') || name.includes('dentaire')) {
    return { category: 'Health', subCategory: 'Dentist' };
  }

  if (name.includes('deezer') || name.includes('spotify') || name.includes('netflix') || name.includes('subscription')) {
    return { category: 'Leisure & Entertainment', subCategory: 'Subscriptions' };
  }
  if (name.includes('decathlon') || name.includes('sport') || name.includes('gym')) {
    return { category: 'Leisure & Entertainment', subCategory: 'Sports' };
  }
  if (name.includes('zoo') || name.includes('museum') || name.includes('cinema')) {
    return { category: 'Leisure & Entertainment', subCategory: 'Cultural' };
  }

  if (name.includes('hotel') || name.includes('mercure') || name.includes('booking')) {
    return { category: 'Travel', subCategory: 'Hotels' };
  }
  if (name.includes('flight') || name.includes('airline') || name.includes('volotea')) {
    return { category: 'Travel', subCategory: 'Flights' };
  }

  if (name.includes('tax') || name.includes('impot') || name.includes('fiscal')) {
    return { category: 'Financial', subCategory: 'Taxes' };
  }
  if (name.includes('loan') || name.includes('pret') || name.includes('credit')) {
    return { category: 'Financial', subCategory: 'Loan' };
  }

  return null;
}

module.exports = {
  categorizeTransaction,
  CATEGORIES
};
