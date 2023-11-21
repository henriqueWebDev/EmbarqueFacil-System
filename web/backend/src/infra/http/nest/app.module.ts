import { Module } from '@nestjs/common';
import UserController from './controllers/User.controller';
import BusController from './controllers/Bus.controller';
import EnterpriseController from './controllers/Enterprise.controller';
import RouteController from './controllers/Route.controller';
import PaymentController from './controllers/Payment.controller';
import RideController from './controllers/Ride.controller';

import UserMemoryRepository from './../../repository/memory/UserMemoryRepository';
import BusMemoryRepository from './../../repository/memory/BusMemoryRepository';
import EnterpriseMemoryRepository from './../../repository/memory/EnterpriseMemoryRepository';
import RouteMemoryRepository from './../../repository/memory/RouteMemoryRepository';
import PaymentMemoryRepository from './../../repository/memory/PaymentMemoryRepository';
import RideMemoryRepository from './../../repository/memory/RideMemoryRepository';

@Module({
  imports: [],
  controllers: [
    UserController,
    BusController,
    EnterpriseController,
    RouteController,
    PaymentController,
    RideController,
  ],
  providers: [
    UserMemoryRepository,
    BusMemoryRepository,
    EnterpriseMemoryRepository,
    RouteMemoryRepository,
    PaymentMemoryRepository,
    RideMemoryRepository,
  ],
})
export class AppModule {}
