import UserRepositoryInterface from '../../../application/repository/userRepositoryInterface';
import User from '../../../domain/User';
import { Injectable } from '@nestjs/common';
@Injectable()
export default class UserMemoryRepository implements UserRepositoryInterface {
  private usersDatabase: Array<any> = [
    {
      _id: 'e0cfa336-747a-486c-bf18-8335fa8aae8b',
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
    },
  ];
  async save(user: User): Promise<void> {
    this.usersDatabase.push({
      _id: user._id,
      cpf: user.cpf,
      rg: user.rg,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      type: user.type,
      idEnterprise: user.idEnterprise,
      adressStreet: user.adressStreet,
      adressNumber: user.adressNumber,
      adressCityId: user.adressCityId,
      adressDistrict: user.adressDistrict,
      adressCep: user.adressCep,
      responsibleName: user.responsibleName,
      responsibleSurname: user.responsibleSurname,
      responsibleCpf: user.responsibleCpf,
      responsibleEmail: user.responsibleEmail,
    });
  }
  async update(userEntity: User): Promise<void> {
    const userIndex = this.usersDatabase.findIndex(
      (databaseUser) => databaseUser._id === userEntity._id,
    );
    if (userIndex === -1) throw new Error('User not found');
    this.usersDatabase[userIndex] = userEntity;
  }
  async delete(userId: string): Promise<void> {
    const userIndex = this.usersDatabase.findIndex(
      (databaseUser) => databaseUser._id === userId,
    );
    if (userIndex === -1) throw new Error('User not found');
    this.usersDatabase.splice(userIndex, 1);
  }
  async getOne(userId: string): Promise<User> {
    const userDto = this.usersDatabase.find(
      (databaseUser) => databaseUser._id === userId,
    );
    if (!userDto) throw new Error('User not found');
    const user = new User(userDto);
    return user;
  }
  async getAll(): Promise<Array<User>> {
    return this.usersDatabase.map((user) => new User(user));
  }
  async getLength(): Promise<number> {
    return this.usersDatabase.length;
  }
}
