import EnterpriseRepositoryInterface from '../../repository/enterpriseRepositoryInterface';
import EnterpriseEntity from '../../../domain/EnterpriseEntity';

export default class UsecaseCreateEnterprise {
  constructor(readonly repo: EnterpriseRepositoryInterface) {}
  async execute(props: Input): Promise<Output> {
    const enterpriseEntity = EnterpriseEntity.create(props);
    await this.repo.save(enterpriseEntity);
    return {
      _id: enterpriseEntity._id,
      cnpj: enterpriseEntity.cnpj,
      name: enterpriseEntity.name,
      phone: enterpriseEntity.phone,
      email: enterpriseEntity.email,
      adressStreet: enterpriseEntity.adressStreet,
      adressNumber: enterpriseEntity.adressNumber,
      adressCityId: enterpriseEntity.adressCityId,
      adressDistrict: enterpriseEntity.adressDistrict,
      adressCep: enterpriseEntity.adressCep,
    };
  }
}

export type Input = {
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  adressStreet: string;
  adressNumber: string;
  adressCityId: string;
  adressDistrict: string;
  adressCep: string;
};

export type Output = {
  _id: string;
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  adressStreet: string;
  adressNumber: string;
  adressCityId: string;
  adressDistrict: string;
  adressCep: string;
};
