import { RepositoryRegistry } from './repository_registry.js';
import { ServiceRegistry } from './service_registry.js';
import { UseCaseRegistry } from './useCase_registry.js';

export class DependencyInjection {
  static registerAll(): void {
    RepositoryRegistry.registerRepositories();
    ServiceRegistry.registerServices();
    UseCaseRegistry.registerUseCases();
  }
}
