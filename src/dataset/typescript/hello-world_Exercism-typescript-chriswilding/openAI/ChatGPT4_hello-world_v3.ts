export default class HelloWorld {
  private static readonly message = "Hello, World!";
  
  static hello(): string {
    return HelloWorld.message;
  }
}