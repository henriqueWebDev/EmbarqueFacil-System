import UserRepositoryInterface from 'src/application/repository/userRepositoryInterface';
import User from '../../../../domain/User';
import { Injectable } from '@nestjs/common';
import UserModel from '../models/mongooseModelUser';
@Injectable()
export default class UserMemoryRepository implements UserRepositoryInterface {
  model = UserModel;
  async save(user: User): Promise<void> {
    this.model.create({
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
  async update(UserEntity: User): Promise<void> {
    const user = await this.model.findByIdAndUpdate(
      UserEntity._id,
      {
        _id: UserEntity._id,
        cpf: UserEntity.cpf,
        rg: UserEntity.rg,
        name: UserEntity.name,
        surname: UserEntity.surname,
        phone: UserEntity.phone,
        email: UserEntity.email,
        password: UserEntity.password,
        birthDate: UserEntity.birthDate,
        type: UserEntity.type,
        idEnterprise: UserEntity.idEnterprise,
        adressStreet: UserEntity.adressStreet,
        adressNumber: UserEntity.adressNumber,
        adressCityId: UserEntity.adressCityId,
        adressDistrict: UserEntity.adressDistrict,
        adressCep: UserEntity.adressCep,
        responsibleName: UserEntity.responsibleName,
        responsibleSurname: UserEntity.responsibleSurname,
        responsibleCpf: UserEntity.responsibleCpf,
        responsibleEmail: UserEntity.responsibleEmail,
      },
      { new: true },
    );
    if (!user) throw new Error('User not found');
  }
  async delete(UserId: string): Promise<void> {
    const User = await this.model.findByIdAndDelete(UserId);
    if (!User) throw new Error('User not found');
  }
  async getOne(UserId: string): Promise<User> {
    const UserDto = await this.model.findById(UserId);
    if (!UserDto) throw new Error('User not found');
    return new User({
      _id: UserDto._id,
      cpf: UserDto.cpf,
      rg: UserDto.rg,
      name: UserDto.name,
      surname: UserDto.surname,
      phone: UserDto.phone,
      email: UserDto.email,
      password: UserDto.password,
      birthDate: UserDto.birthDate,
      type: UserDto.type,
      idEnterprise: UserDto.idEnterprise,
      adressStreet: UserDto.adressStreet,
      adressNumber: UserDto.adressNumber,
      adressCityId: UserDto.adressCityId,
      adressDistrict: UserDto.adressDistrict,
      adressCep: UserDto.adressCep,
      responsibleName: UserDto.responsibleName,
      responsibleSurname: UserDto.responsibleSurname,
      responsibleCpf: UserDto.responsibleCpf,
      responsibleEmail: UserDto.responsibleEmail,
    });
  }
  async getAll(): Promise<Array<User>> {
    const Users = await this.model.find();
    return Users.map(
      (UserDto) =>
        new User({
          _id: UserDto._id,
          cpf: UserDto.cpf,
          rg: UserDto.rg,
          name: UserDto.name,
          surname: UserDto.surname,
          phone: UserDto.phone,
          email: UserDto.email,
          password: UserDto.password,
          birthDate: UserDto.birthDate,
          type: UserDto.type,
          idEnterprise: UserDto.idEnterprise,
          adressStreet: UserDto.adressStreet,
          adressNumber: UserDto.adressNumber,
          adressCityId: UserDto.adressCityId,
          adressDistrict: UserDto.adressDistrict,
          adressCep: UserDto.adressCep,
          responsibleName: UserDto.responsibleName,
          responsibleSurname: UserDto.responsibleSurname,
          responsibleCpf: UserDto.responsibleCpf,
          responsibleEmail: UserDto.responsibleEmail,
        }),
    );
  }
  async getLength(): Promise<number> {
    return (await this.model.find()).length;
  }
}
