class HelloWorld {
  private static readonly HELLO_PREFIX = 'Hello, ';
  private static readonly HELLO_SUFFIX = '!';
  private static readonly DEFAULT_NAME = 'World';
  private static readonly DEFAULT_GREETING = 'Hello, World!';

  static hello(name: string = HelloWorld.DEFAULT_NAME): string {
    return name === HelloWorld.DEFAULT_NAME 
      ? HelloWorld.DEFAULT_GREETING
      : HelloWorld.HELLO_PREFIX + name + HelloWorld.HELLO_SUFFIX;
  }
}

export default HelloWorld;