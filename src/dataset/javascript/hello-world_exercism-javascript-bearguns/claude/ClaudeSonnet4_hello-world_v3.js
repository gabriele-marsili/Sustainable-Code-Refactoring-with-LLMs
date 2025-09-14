const HelloWorld = function() {};

HelloWorld.prototype.hello = function(input) {
    return input ? `Hello, ${input}!` : "Hello, World!";
};

export default HelloWorld;