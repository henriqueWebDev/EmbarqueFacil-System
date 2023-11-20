import EnterpriseEntity from '../../../../domain/EnterpriseEntity';
import EnterpriseMemoryRepository from '../EnterpriseMemoryRepository';

function CompareObjects(object1: any, object2: any) {
  expect(object1.cnpj).toBe(object2.cnpj);
  expect(object1.name).toBe(object2.name);
  expect(object1.phone).toBe(object2.phone);
  expect(object1.email).toBe(object2.email);
  expect(object1.adressStreet).toBe(object2.adressStreet);
  expect(object1.adressNumber).toBe(object2.adressNumber);
  expect(object1.adressDistrict).toBe(object2.adressDistrict);
  expect(object1.adressCep).toBe(object2.adressCep);
}

it('should test if the database creates a new Enterprise', async () => {
  const validInput = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const repo = new EnterpriseMemoryRepository();
  const firstLength = await repo.getLength();
  const enterprise = EnterpriseEntity.create(validInput);
  await repo.save(enterprise);
  expect(await repo.getOne(enterprise._id)).toBeDefined();
  expect(await repo.getLength()).toBe(firstLength + 1);
});
it('should test if the database creates a new Enterprise with the exact same data', async () => {
  const validInput = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const repo = new EnterpriseMemoryRepository();
  const enterprise = EnterpriseEntity.create(validInput);
  await repo.save(enterprise);
  const getEnterprise = await repo.getOne(enterprise._id);
  CompareObjects(getEnterprise, validInput);
});

it('should test if the database deletes a Enterprise', async () => {
  const validInput = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const repo = new EnterpriseMemoryRepository();
  const firstLength = await repo.getLength();
  const Enterprise = EnterpriseEntity.create(validInput);
  await repo.save(Enterprise);
  await repo.delete(Enterprise._id);
  expect(await repo.getLength()).toBe(firstLength);
});

it('should test if the database updates a Enterprise', async () => {
  const validInput1 = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };

  const repo = new EnterpriseMemoryRepository();
  const enterpriseCreate = EnterpriseEntity.create(validInput1);
  await repo.save(enterpriseCreate);
  const validInput2 = {
    _id: enterpriseCreate._id,
    cnpj: '01916446000123',
    name: 'Empresa valida2',
    phone: '69984696665',
    email: 'Empresaa@gmail.com',
    adressStreet: 'rua dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const enterpriseUpdate = new EnterpriseEntity(validInput2);
  await repo.update(enterpriseUpdate);
  const getEnterprise = await repo.getOne(enterpriseCreate._id);
  CompareObjects(getEnterprise, validInput2);
});

it('should test if the database creates new Enterprises (test getall)', async () => {
  const validInput1 = {
    cnpj: '01916446000123',
    name: 'Empresa valida',
    phone: '69984696665',
    email: 'Empresa@gmail.com',
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const validInput2 = {
    cnpj: '01916446000123',
    name: 'Empresa valida2',
    phone: '69984696665',
    email: 'Empresaa@gmail.com',
    adressStreet: 'rua dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '',
  };
  const repo = new EnterpriseMemoryRepository();
  const firstLength = await repo.getLength();
  const Enterprise1 = EnterpriseEntity.create(validInput1);
  await repo.save(Enterprise1);
  expect(repo.getOne(Enterprise1._id)).toBeDefined();
  const Enterprise2 = EnterpriseEntity.create(validInput2);
  await repo.save(Enterprise2);
  expect(repo.getOne(Enterprise2._id)).toBeDefined();
  expect(await repo.getLength()).toBe(firstLength + 2);
  const getAll = await repo.getAll();
  expect(
    getAll.find((Enterprise) => Enterprise._id == Enterprise1._id),
  ).toBeDefined();
  expect(
    getAll.find((Enterprise) => Enterprise._id == Enterprise2._id),
  ).toBeDefined();
});

it('should test if the database gives an error if the Enterprise tries to access a invalid Id', async () => {
  const repo = new EnterpriseMemoryRepository();
  expect(() => repo.getOne('id')).rejects.toThrow(
    new Error('Enterprise not found'),
  );
});
