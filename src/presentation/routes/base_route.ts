import { Router } from 'express';

export abstract class BaseRoute {
  protected router: Router;

  constructor() {
    this.router = Router();
    
  }

  protected abstract initRoutes(): void;
  public getRouter(): Router {
    return this.router;
  }
}
