import { delay } from '../src';

describe('delay 10 seconds', () => {
  it('passes after delay', async () => {
    await delay(10 * 1000);
    expect(true).toBe(true);
  });
});
