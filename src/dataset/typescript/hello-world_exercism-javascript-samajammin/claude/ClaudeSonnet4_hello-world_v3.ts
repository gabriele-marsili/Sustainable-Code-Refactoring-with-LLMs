class HelloWorld {
  private static readonly HELLO_PREFIX = 'Hello, ';
  private static readonly HELLO_SUFFIX = '!';
  private static readonly DEFAULT_NAME = 'World';

  static hello(name: string = HelloWorld.DEFAULT_NAME): string {
    return HelloWorld.HELLO_PREFIX + name + HelloWorld.HELLO_SUFFIX;
  }
}

export default HelloWorld;