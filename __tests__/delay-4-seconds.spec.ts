import { delay } from '../src';

describe('delay 4 seconds', () => {
  it('passes after delay', async () => {
    await delay(4 * 1000);
    expect(true).toBe(true);
  });
});
