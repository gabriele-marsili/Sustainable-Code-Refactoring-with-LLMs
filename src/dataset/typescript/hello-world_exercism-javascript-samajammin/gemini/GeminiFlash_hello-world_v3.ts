class HelloWorld {
  private static readonly greeting = "Hello, ";
  private static readonly exclamation = "!";

  static hello(name: string = 'World'): string {
    return `${HelloWorld.greeting}${name}${HelloWorld.exclamation}`;
  }
}

export default HelloWorld;