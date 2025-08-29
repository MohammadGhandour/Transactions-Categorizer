# Transactions Categorizer

A JavaScript algorithm that categorizes financial transactions based on their name, amount, and type.

## Features

- Categorizes transactions into predefined categories and subcategories
- Supports multiple transaction types
- Rule-based categorization algorithm
- Easy to extend and customize

## Usage

```javascript
const { categorizeTransaction } = require('./src/categorizer');

const transaction = {
  name: "STARBUCKS COFFEE",
  amount: -4.50,
  type: "card"
};

const result = categorizeTransaction(transaction);
console.log(result); // { category: "Food & Drinks", subCategory: "Bars & Cafés" }
```

## Development

```bash
npm install
npm test
npm run lint
```