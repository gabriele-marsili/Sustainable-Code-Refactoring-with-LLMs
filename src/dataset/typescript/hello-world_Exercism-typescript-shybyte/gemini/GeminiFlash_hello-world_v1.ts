class HelloWorld {
    private static readonly DEFAULT_NAME = 'World';
    private static readonly HELLO_STRING = 'Hello, ';
    private static readonly EXCLAMATION_MARK = '!';

    static hello(name: string = HelloWorld.DEFAULT_NAME): string {
        return HelloWorld.HELLO_STRING + name + HelloWorld.EXCLAMATION_MARK;
    }
}

export default HelloWorld