import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const getTransactionsService = new GetTransactionsService(
      transactionsRepository,
    );
    const resume = getTransactionsService.execute();
    return response.json(resume);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Get values
    const { title, value, type } = request.body;
    // access service
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    // execute service
    const transaction = createTransaction.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
