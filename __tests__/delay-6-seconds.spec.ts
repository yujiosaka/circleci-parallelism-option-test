import { delay } from '../src';

describe('delay 6 seconds', () => {
  it('passes after delay', async () => {
    await delay(6 * 1000);
    expect(true).toBe(true);
  });
});
