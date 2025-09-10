class HelloWorld {
  private static readonly greeting = "Hello, World!";

  static hello(): string {
    return HelloWorld.greeting;
  }
}

export default HelloWorld;