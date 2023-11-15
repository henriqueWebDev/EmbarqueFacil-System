import { Module } from '@nestjs/common';
import UserController from './controllers/User.controller';
import BusController from './controllers/Bus.controller';
import EnterpriseController from './controllers/Enterprise.controller';
import RouteController from './controllers/Route.controller';

import UserMemoryRepository from './../../repository/memory/UserMemoryRepository';
import BusMemoryRepository from './../../repository/memory/BusMemoryRepository';
import EnterpriseMemoryRepository from './../../repository/memory/EnterpriseMemoryRepository';
import RouteMemoryRepository from './../../repository/memory/RouteMemoryRepository';

@Module({
  imports: [],
  controllers: [
    UserController,
    BusController,
    EnterpriseController,
    RouteController,
  ],
  providers: [
    UserMemoryRepository,
    BusMemoryRepository,
    EnterpriseMemoryRepository,
    RouteMemoryRepository,
  ],
})
export class AppModule {}
