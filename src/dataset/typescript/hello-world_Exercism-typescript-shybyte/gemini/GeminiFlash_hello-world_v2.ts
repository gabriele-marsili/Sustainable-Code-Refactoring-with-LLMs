class HelloWorld {
    private static readonly DEFAULT_NAME = 'World';

    static hello(name: string = HelloWorld.DEFAULT_NAME): string {
        return `Hello, ${name}!`;
    }
}

export default HelloWorld;