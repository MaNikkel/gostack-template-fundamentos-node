import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  execute(): Response {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    return {
      transactions,
      balance,
    };
  }
}

export default GetTransactionsService;
