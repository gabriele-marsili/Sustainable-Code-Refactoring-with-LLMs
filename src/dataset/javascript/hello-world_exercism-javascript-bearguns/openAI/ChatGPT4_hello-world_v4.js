class HelloWorld {
  hello(input = "") {
    return `Hello, ${input || "World"}!`;
  }
}

export default HelloWorld;