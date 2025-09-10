class HelloWorld {
  static hello(name?: string) {
    return `Hello, ${name ?? 'World'}!`;
  }
}

export default HelloWorld;