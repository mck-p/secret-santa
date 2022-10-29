export class NotImplemented extends Error {
  code = 1000;

  constructor(action: string) {
    super();

    this.message = `We cannot perform "${action}" due to the programmers not yet implemeting it!`;
  }
}
