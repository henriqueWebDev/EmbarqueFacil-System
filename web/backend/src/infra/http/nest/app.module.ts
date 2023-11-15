import { Module } from '@nestjs/common';
import UserController from './controllers/User.controller';
import BusController from './controllers/Bus.controller';
import UserMemoryRepository from './../../repository/memory/UserMemoryRepository';
import BusMemoryRepository from './../../repository/memory/BusMemoryRepository';
import EnterpriseMemoryRepository from './../../repository/memory/EnterpriseMemoryRepository';
import EnterpriseController from './controllers/Enterprise.controller';

@Module({
  imports: [],
  controllers: [UserController, BusController, EnterpriseController],
  providers: [
    UserMemoryRepository,
    BusMemoryRepository,
    EnterpriseMemoryRepository,
  ],
})
export class AppModule {}
