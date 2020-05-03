import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

import TransactionType from '../models/TransactionType';

interface RequestDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome'; // 'type' need to be equals 'type' on TransactionDTO declared inner TransactionsRespository.ts
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === TransactionType.OUTCOME) {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw Error('Saldo insuficiente');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
