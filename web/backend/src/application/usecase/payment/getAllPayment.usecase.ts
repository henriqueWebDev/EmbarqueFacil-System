import PaymentRepositoryInterface from '../../repository/PaymentRepositoryInterface';

export default class UsecaseGetAllPayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(): Promise<Output> {
    const entities = (await this.repo.getAll()).map((entity) => {
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
    });

    return entities;
  }
}

export type Output = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  installments: Array<{ paidDate: Date; expireDate: Date }>;
}[];
