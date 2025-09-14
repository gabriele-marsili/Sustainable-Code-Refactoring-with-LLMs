export default class HelloWorld {
  private static readonly HELLO_MESSAGE = "Hello, World!";
  
  static hello(): string {
    return HelloWorld.HELLO_MESSAGE;
  }
}