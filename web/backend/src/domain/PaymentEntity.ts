import { randomUUID } from 'crypto';
import InstallmentEntity, { InstallmentDto } from './InstallmentEntity';
export default class PaymentEntity {
  constructor(private props: PaymentDto) {
    this.props.installments = this.props.installments.map((installmentDto) => {
      return new InstallmentEntity(installmentDto);
    });
  }
  static create(props: Omit<PaymentDto, '_id'>) {
    const _id = randomUUID();
    return new PaymentEntity({
      _id,
      ...props,
    });
  }

  get _id() {
    return this.props._id;
  }
  get enterpriseId() {
    return this.props.enterpriseId;
  }
  get clientId() {
    return this.props.clientId;
  }
  get installments() {
    return this.props.installments;
  }
  set installments(installments: Array<InstallmentDto>) {
    this.props.installments = installments.map((installmentDto) => {
      return new InstallmentEntity(installmentDto);
    });
  }
}

export type PaymentDto = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  installments: Array<InstallmentDto>;
};
