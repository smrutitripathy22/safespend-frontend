export const dummyBudgetData=[
    {
        categoryId: 1,
        categoryName: 'Groceries',
        budgetedValue: '15,000'
    },
    {
        categoryId: 2,
        categoryName: 'Rent',
        budgetedValue: '25,000'
    },
    {
        categoryId: 3,
        categoryName: 'Utilities',
        budgetedValue: '4,500'
    },
    {
        categoryId: 4,
        categoryName: 'Transportation',
        budgetedValue: '6,000'
    },
    {
        categoryId: 5,
        categoryName: 'Entertainment',
        budgetedValue: '3,500'
    },
    {
        categoryId: 6,
        categoryName: 'Dining Out',
        budgetedValue: '7,000'
    },

    {
        categoryId: 8,
        categoryName: 'Health & Wellness',
        budgetedValue: '2,500'
    },
    {
        categoryId: 9,
        categoryName: 'Shopping',
        budgetedValue: '5,000'
    },
    {
        categoryId: 10,
        categoryName: 'Miscellaneous',
        budgetedValue: '2,000'
    }
]
export const dummyExpenseData=[
    {
        categoryId: 1,
        categoryName: 'Groceries',
        expenseValue: '15,000',
        compliance:'Under-Budget'
    },
    {
        categoryId: 2,
        categoryName: 'Rent',
        expenseValue: '25,000',
         compliance:'Under-Budget'
    },
    {
        categoryId: 3,
        categoryName: 'Utilities',
        expenseValue: '4,500',
        compliance:'Under-Budget'
    },
    {
        categoryId: 4,
        categoryName: 'Transportation',
        expenseValue: '6,000',
        compliance:'Under-Budget'
    },
    {
        categoryId: 5,
        categoryName: 'Entertainment',
        expenseValue: '3,500',
        compliance:'Under-Budget'
    },
    {
        categoryId: 6,
        categoryName: 'Dining Out',
        expenseValue: '7,000',
        compliance:'Exceeding-Buget'
    },

    {
        categoryId: 8,
        categoryName: 'Health & Wellness',
        expenseValue: '2,500',
        compliance:'Under-Budget'
    },
    {
        categoryId: 9,
        categoryName: 'Shopping',
        expenseValue: '5,000',
        compliance:'Under-Budget'
    },
    {
        categoryId: 10,
        categoryName: 'Miscellaneous',
        expenseValue: '2,000',
        compliance:'Under-Budget'
    }
]
export const dummyTransactionLogs = [
    {
        transactionId: 1,
        transactionDate: '15/08/2025',
        transactionType: 'Wallet Top-up',
        categoryName: '',
        amount: 15000,
        description: 'funds added to wallet'
    },
    {
        transactionId: 2,
        transactionDate: '16/08/2025',
        transactionType: 'Expense',
        categoryName: 'Groceries',
        amount: 850,
        description: 'Weekly grocery shopping'
    },
    {
        transactionId: 3,
        transactionDate: '16/08/2025',
        transactionType: 'Expense',
        categoryName: 'Dining Out',
        amount: 450,
        description: 'Lunch at cafe'
    },
    {
        transactionId: 4,
        transactionDate: '17/08/2025',
        transactionType: 'Wallet Top-up',
        categoryName: '',
        amount: 5000,
        description: 'funds added to wallet'
    },
    {
        transactionId: 5,
        transactionDate: '17/08/2025',
        transactionType: 'Expense',
        categoryName: 'Transportation',
        amount: 250,
        description: 'Metro card recharge'
    },
    {
        transactionId: 6,
        transactionDate: '17/08/2025',
        transactionType: 'Expense',
        categoryName: 'Entertainment',
        amount: 700,
        description: 'Movie ticket'
    },
    {
        transactionId: 7,
        transactionDate: '18/08/2025',
        transactionType: 'Expense',
        categoryName: 'Utilities',
        amount: 1200,
        description: 'Mobile phone bill'
    },
    {
        transactionId: 8,
        transactionDate: '19/08/2025',
        transactionType: 'Expense',
        categoryName: 'Shopping',
        amount: 1500,
        description: 'New T-shirt and jeans'
    },
    {
        transactionId: 9,
        transactionDate: '20/08/2025',
        transactionType: 'Expense',
        categoryName: 'Health & Wellness',
        amount: 300,
        description: 'Vitamins'
    },
    {
        transactionId: 10,
        transactionDate: '21/08/2025',
        transactionType: 'Expense',
        categoryName: 'Miscellaneous',
        amount: 100,
        description: 'Magazine purchase'
    }
];

export const dummyDailySpend=[
 { "transactionDate": "2025-08-01", "amount": 142.64 },
  { "transactionDate": "2025-08-02", "amount": 225.84 },
  { "transactionDate": "2025-08-03", "amount": 242.56 },
  { "transactionDate": "2025-08-04", "amount": 47.23 },
  { "transactionDate": "2025-08-05", "amount": 145.19 },
  { "transactionDate": "2025-08-06", "amount": 343.44 },
  { "transactionDate": "2025-08-07", "amount": 47.27 },
  { "transactionDate": "2025-08-08", "amount": 395.13 },
  { "transactionDate": "2025-08-09", "amount": 79.75 },
  { "transactionDate": "2025-08-10", "amount": 109.53 }
]
export  const dummyPlannedVsActual = [
    { category: 'Rent', planned: 1500, actual: 1500 },
    { category: 'Groceries', planned: 500, actual: 800 },
    { category: 'Entertainment', planned: 300, actual: 400 },
    { category: 'Utilities', planned: 400, actual: 500 },
  ];

     export   const dummyExpenseBreakdown = [
      { name: 'Rent', value: 1500 },
      { name: 'Groceries', value: 800 },
      { name: 'Entertainment', value: 400 },
      { name: 'Utilities', value: 500 },
    ];
    export const dummyRecentTransactions = [
    { date: '2025-08-10', category: 'Groceries', amount: 300 },
    { date: '2025-08-08', category: 'Electricity Bill', amount: 500 },
    { date: '2025-08-05', category: 'Restaurant', amount: 200 },
  ];