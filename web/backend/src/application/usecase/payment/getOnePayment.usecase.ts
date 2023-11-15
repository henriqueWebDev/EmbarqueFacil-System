import PaymentRepositoryInterface from '../../repository/PaymentRepositoryInterface';

export default class UsecaseGetOnePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(_id: Input): Promise<Output> {
    const entity = await this.repo.getOne(_id);
    const installments = entity.installments.map((element) => {
      return {
        paidDate: element.paidDate,
        expireDate: element.expireDate,
      };
    });
    return {
      _id: entity._id,
      enterpriseId: entity.enterpriseId,
      clientId: entity.clientId,
      installments: installments,
    };
  }
}

export type Input = string;

export type Output = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  installments: Array<{ paidDate: Date; expireDate: Date }>;
};
