class HelloWorld {
  private static readonly _hello = "Hello, World!";
  
  static hello(): string {
    return HelloWorld._hello;
  }
}

export default HelloWorld;