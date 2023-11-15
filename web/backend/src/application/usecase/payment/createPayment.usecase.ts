import PaymentRepositoryInterface from '../../repository/PaymentRepositoryInterface';
import PaymentEntity from '../../../domain/PaymentEntity';

export default class UsecaseCreatePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(props: Input): Promise<Output> {
    const entity = PaymentEntity.create(props);
    await this.repo.save(entity);

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
