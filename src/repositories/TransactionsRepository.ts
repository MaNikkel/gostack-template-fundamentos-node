import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (acc: Balance, cur) => {
        if (cur.type === 'income') {
          acc.income += cur.value;
          acc.total += cur.value;
        } else if (cur.type === 'outcome') {
          acc.outcome += cur.value;
          acc.total -= cur.value;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, title, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
