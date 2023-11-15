import PaymentRepositoryInterface from '../../repository/PaymentRepositoryInterface';
import PaymentEntity from '../../../domain/PaymentEntity';

export default class UsecaseUpdatePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(entityData: Input): Promise<Output> {
    const entity = new PaymentEntity(entityData);
    await this.repo.update(entity);
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

export type Input = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  installments: Array<{ paidDate: Date; expireDate: Date }>;
};

export type Output = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  installments: Array<{ paidDate: Date; expireDate: Date }>;
};
