import Coaster from '../../entites/coaster.entity.ts';
import { type BaseEvent } from '../base-event.interface.ts';

class CoasterRegistered implements BaseEvent<string, Coaster> {
  public eventName = 'coaster.registered';

  constructor(public payload: Coaster) {
    this.payload = payload;
  }
}

export { Coaster, CoasterRegistered };

export default CoasterRegistered;
