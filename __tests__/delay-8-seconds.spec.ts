import { delay } from '../src';

describe('delay 8 seconds', () => {
  it('passes after delay', async () => {
    await delay(8 * 1000);
    expect(true).toBe(true);
  });
});
