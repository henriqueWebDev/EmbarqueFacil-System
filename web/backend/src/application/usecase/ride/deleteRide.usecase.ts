import RideRepositoryInterface from '../../repository/rideRepositoryInterface';

export default class UsecaseDeletePayment {
  constructor(readonly repo: RideRepositoryInterface) {}
  async execute(PaymentId: Input): Promise<void> {
    this.repo.delete(PaymentId);
  }
}

export type Input = string;
