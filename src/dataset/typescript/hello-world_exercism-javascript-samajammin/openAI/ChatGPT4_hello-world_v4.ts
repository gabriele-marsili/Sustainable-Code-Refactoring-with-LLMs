class HelloWorld {
  private static readonly defaultName = 'World';

  static hello(name?: string): string {
    return `Hello, ${name ?? HelloWorld.defaultName}!`;
  }
}

export default HelloWorld;