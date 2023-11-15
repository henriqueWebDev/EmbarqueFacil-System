import User from '../../../../domain/User';
import UserMemoryRepository from '../UserMemoryRepository';

const validInput = {
  cpf: '70116562277',
  rg: '1551035',
  name: 'Guilherme',
  surname: 'Fornaciari',
  phone: '69984696665',
  email: 'fornaciari049@gmail.com',
  password: 'sim',
  birthDate: '08-23-2005',
  type: 'client',
  idEnterprise: '',
  adressStreet: 'rua vanderlei dallacosta',
  adressNumber: '0310',
  adressCityId: '',
  adressDistrict: 'centro',
  adressCep: '',
  responsibleName: 'Claudete',
  responsibleSurname: 'Izabel',
  responsibleCpf: '31547389249',
  responsibleEmail: 'izabeldesouzaclaudete@gmail.com',
};
const validInput2 = {
  cpf: '31547389249',
  rg: '1551035',
  name: 'Claudete',
  surname: 'Izabel',
  phone: '69984112317',
  email: 'izabeldesouza@gmail.com',
  password: 'sim',
  birthDate: '08-23-2005',
  type: 'admin',
  idEnterprise: '',
  adressStreet: 'rua vanderlei dallacosta',
  adressNumber: '0310',
  adressCityId: '',
  adressDistrict: 'centro',
  adressCep: '76950000',
  responsibleName: '',
  responsibleSurname: '',
  responsibleCpf: '',
  responsibleEmail: '',
};
function compareObject(user: User, object: any) {
  expect(user.cpf).toBe(object.cpf);
  expect(user.rg).toBe(object.rg);
  expect(user.name).toBe(object.name);
  expect(user.surname).toBe(object.surname);
  expect(user.phone).toBe(object.phone);
  expect(user.email).toBe(object.email);
  expect(user.password).toBe(object.password);
  expect(user.birthDate).toBe(object.birthDate);
  expect(user.type).toBe(object.type);
  expect(user.idEnterprise).toBe(object.idEnterprise);

  expect(user.adressStreet).toBe(object.adressStreet);
  expect(user.adressNumber).toBe(object.adressNumber);
  expect(user.adressCityId).toBe(object.adressCityId);
  expect(user.adressDistrict).toBe(object.adressDistrict);
  expect(user.adressCep).toBe(object.adressCep);

  expect(user.responsibleName).toBe(object.responsibleName);
  expect(user.responsibleSurname).toBe(object.responsibleSurname);
  expect(user.responsibleCpf).toBe(object.responsibleCpf);
  expect(user.responsibleEmail).toBe(object.responsibleEmail);
}

it('should test if the database creates a new user', async () => {
  const repo = new UserMemoryRepository();
  const firstLength = await repo.getLength();
  const user = User.create(validInput);
  await repo.save(user);
  expect(repo.getOne(user._id)).toBeDefined();
  expect(await repo.getLength()).toBe(firstLength + 1);
});
it('should test if the database creates a new user with the exact same data', async () => {
  const repo = new UserMemoryRepository();
  const user = User.create(validInput);
  await repo.save(user);
  const getUser = await repo.getOne(user._id);
  compareObject(getUser, validInput);
});

it('should test if the database deletes a user', async () => {
  const repo = new UserMemoryRepository();
  const firstLength = await repo.getLength();
  const user = User.create(validInput);
  await repo.save(user);
  await repo.delete(user._id);
  expect(await repo.getLength()).toBe(firstLength);
});

it('should test if the database updates a user', async () => {
  const anotherValidInput = {
    ...validInput,
    email: 'Forninsadassdha049@gmail.com',
  };

  const repo = new UserMemoryRepository();
  const userCreate = User.create(validInput);
  await repo.save(userCreate);
  const userUpdate = await repo.getOne(userCreate._id);
  userUpdate.email = anotherValidInput.email;
  await repo.update(userUpdate);
  const getuser = await repo.getOne(userCreate._id);
  compareObject(getuser, anotherValidInput);
});

it('should test if the database creates new users (test getall)', async () => {
  const repo = new UserMemoryRepository();
  const firstLength = await repo.getLength();
  const user1 = User.create(validInput);
  await repo.save(user1);
  expect(repo.getOne(user1._id)).toBeDefined();
  const user2 = User.create(validInput2);
  await repo.save(user2);
  expect(repo.getOne(user2._id)).toBeDefined();
  expect(await repo.getLength()).toBe(firstLength + 2);
  const getAll = await repo.getAll();
  expect(getAll.find((user) => user._id == user1._id)).toBeDefined();
  expect(getAll.find((user) => user._id == user2._id)).toBeDefined();
});

it('should test if the database gives an error if the user tries to access a invalid Id', async () => {
  const repo = new UserMemoryRepository();
  expect(() => repo.getOne('id')).rejects.toThrow(new Error('User not found'));
});
