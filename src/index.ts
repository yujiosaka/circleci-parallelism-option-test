export async function delay(timeout: number) {
  await new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
