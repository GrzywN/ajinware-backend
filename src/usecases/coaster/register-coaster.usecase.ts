import CoasterRegistered, { Coaster } from '../../events/coaster/coaster-registered.event.ts';
import injectEventBus, { type EventBus } from '../../infrastructure/event-bus.ts';
import { register } from '../../utils/service-locator.ts';

class RegisterCoasterUseCase {
  constructor(private eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  async execute(payload: Coaster): Promise<Coaster> {
    const event = new CoasterRegistered(payload);
    this.eventBus.publish(event.eventName, event.payload);

    return payload;
  }
}

register(RegisterCoasterUseCase, () => new RegisterCoasterUseCase(injectEventBus()));

export default RegisterCoasterUseCase;
