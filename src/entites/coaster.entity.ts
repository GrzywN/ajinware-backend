import { assert, integer, min, object, optional, refine, string } from 'superstruct';
import { v4 as uuidv4 } from 'uuid';

class Coaster {
  constructor(
    readonly uuid: string,
    readonly numberOfStaff: number,
    readonly numberOfCustomers: number,
    readonly routeLengthInMeters: number,
    readonly hoursFromInMinutes: number,
    readonly hoursToInMinutes: number,
  ) {
    this.uuid = uuid;
    this.numberOfStaff = numberOfStaff;
    this.numberOfCustomers = numberOfCustomers;
    this.routeLengthInMeters = routeLengthInMeters;
    this.hoursFromInMinutes = hoursFromInMinutes;
    this.hoursToInMinutes = hoursToInMinutes;
  }

  static convertHoursToMinutes(hours: number, minutes: number): number {
    return hours * 60 + minutes;
  }

  static fromJSON(json: unknown): Coaster {
    const schema = object({
      uuid: optional(string()),
      numberOfStaff: min(integer(), 0),
      numberOfCustomers: min(integer(), 0),
      routeLengthInMeters: min(integer(), 0),
      hoursFromInMinutes: refine(
        integer(),
        'hoursFromInMinutes',
        (value) => value >= 0 && value <= 24 * 60,
      ),
      hoursToInMinutes: refine(
        integer(),
        'hoursToInMinutes',
        (value) => value >= 0 && value <= 24 * 60,
      ),
    });

    assert(json, schema);

    return new Coaster(
      json.uuid ?? uuidv4(),
      json.numberOfStaff,
      json.numberOfCustomers,
      json.routeLengthInMeters,
      json.hoursFromInMinutes,
      json.hoursToInMinutes,
    );
  }

  static example(): Coaster {
    return Coaster.fromJSON({
      numberOfStaff: 16,
      numberOfCustomers: 60000,
      routeLengthInMeters: 1800,
      hoursFromInMinutes: Coaster.convertHoursToMinutes(8, 0),
      hoursToInMinutes: Coaster.convertHoursToMinutes(16, 0),
    });
  }
}

export default Coaster;
