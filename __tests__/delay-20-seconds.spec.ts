import { delay } from '../src';

describe('delay 20 seconds', () => {
  it('passes after delay', async () => {
    await delay(20 * 1000);
    expect(true).toBe(true);
  });
});
