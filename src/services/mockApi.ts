export function mockApi(): Promise<void> {
  const delay = Math.random() * 29000 + 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      Math.random() > 0.5 ? resolve() : reject();
    }, delay);
  });
}
