import RouteRepositoryInterface from '../../repository/RouteRepositoryInterface';

export default class UsecaseDeleteRoute {
  constructor(readonly repo: RouteRepositoryInterface) {}
  async execute(routeId: Input): Promise<void> {
    this.repo.delete(routeId);
  }
}

export type Input = string;
