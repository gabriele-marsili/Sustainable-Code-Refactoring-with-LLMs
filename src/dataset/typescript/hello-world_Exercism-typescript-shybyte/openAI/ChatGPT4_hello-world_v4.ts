class HelloWorld {
    private static readonly defaultName = 'World';

    static hello(name: string = HelloWorld.defaultName): string {
        return `Hello, ${name}!`;
    }
}

export default HelloWorld;