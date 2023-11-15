import PaymentRepositoryInterface from '../../repository/PaymentRepositoryInterface';

export default class UsecaseDeletePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(PaymentId: Input): Promise<void> {
    this.repo.delete(PaymentId);
  }
}

export type Input = string;
