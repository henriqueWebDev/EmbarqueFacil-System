import User from 'src/domain/User';

export default interface UserRepositoryInterface {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
  getOne(userId: string): Promise<User>;
  login(loginData): Promise<object>;
  getAll(): Promise<Array<User>>;
  getLength(): Promise<number>;
}
