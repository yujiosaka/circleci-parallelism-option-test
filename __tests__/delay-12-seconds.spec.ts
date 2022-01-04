import { delay } from '../src';

describe('delay 12 seconds', () => {
  it('passes after delay', async () => {
    await delay(12 * 1000);
    expect(true).toBe(true);
  });
});
