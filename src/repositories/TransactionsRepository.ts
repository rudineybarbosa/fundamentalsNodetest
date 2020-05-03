import Transaction from '../models/Transaction';

import TransactionType from '../models/TransactionType';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = { income: 0, outcome: 0, total: 0 };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce(
      (accumulator, currentTransaction) => {
        let value = 0;
        if (currentTransaction.type === TransactionType.INCOME) {
          value = currentTransaction.value;
        }
        return accumulator + value;
      },
      0,
    );
    this.balance.income = totalIncome;

    const totalOutcome = this.transactions.reduce(
      (accumulator, currentTransaction) => {
        let value = 0;
        if (currentTransaction.type == TransactionType.OUTCOME) {
          value = currentTransaction.value;
        }
        return accumulator + value;
      },
      0,
    );

    this.balance.outcome = totalOutcome;

    this.balance.total = totalIncome - totalOutcome;

    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
