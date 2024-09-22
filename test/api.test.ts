import request from 'supertest';
import app from '../src/app';
import uuidRegExp from './helpers/uuid-regexp.test-helper';

describe('POST /api/coasters', () => {
  it('responds with a json message', (done) => {
    request(app)
      .post('/api/coasters')
      .send({
        numberOfStaff: 16,
        numberOfCustomers: 60000,
        routeLengthInMeters: 1800,
        hoursFromInMinutes: 8 * 60,
        hoursToInMinutes: 16 * 60,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            uuid: expect.stringMatching(uuidRegExp),
            numberOfStaff: 16,
            numberOfCustomers: 60000,
            routeLengthInMeters: 1800,
            hoursFromInMinutes: 8 * 60,
            hoursToInMinutes: 16 * 60,
          }),
        );
      })
      .end(done);
  });
});
