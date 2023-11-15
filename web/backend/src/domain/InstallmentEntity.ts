export default class InstallmentEntity {
  constructor(private props: InstallmentDto) {}
  get expireDate() {
    return this.props.expireDate;
  }
  set expireDate(expireDate: Date) {
    this.props.expireDate = expireDate;
  }
  get paidDate() {
    return this.props.paidDate;
  }
  set paidDate(paidDate: Date) {
    this.props.paidDate = paidDate;
  }
}

export type InstallmentDto = {
  expireDate: Date;
  paidDate: Date;
};
