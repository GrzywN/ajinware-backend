import logger from '../config/logger.ts';

interface Services {
  [key: symbol]: any;
}

const services: Services = {};

function register<T extends { new (..._args: any[]): any }>(
  service: T,
  factoryFunction: () => InstanceType<T>,
  disposeFunction?: (_instance: InstanceType<T>) => any | Promise<any>,
): void {
  const key = Symbol.for(service.name);

  if (services[key]) {
    throw new Error(`Service ${service.name} is already registered`);
  }

  services[key] = factoryFunction();

  if (disposeFunction) {
    const shutdown = async () => {
      await disposeFunction(services[key]);
      logger.info(`Service ${service.name} disposed`);
      process.exit(0);
    };

    process.on('beforeExit', async () => {
      await shutdown();
    });
  }
}

function inject<T extends { new (..._args: any[]): any }>(service: T): InstanceType<T> {
  const key = Symbol.for(service.name);

  if (!services[key]) {
    throw new Error(`Service ${service.name} is not registered`);
  }

  return services[key];
}

export { inject, register };
