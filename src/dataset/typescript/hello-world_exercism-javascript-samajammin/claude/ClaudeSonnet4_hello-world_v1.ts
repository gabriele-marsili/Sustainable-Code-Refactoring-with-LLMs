const hello = (name: string = 'World'): string => `Hello, ${name}!`;

class HelloWorld {
  static hello = hello;
}

export default HelloWorld;