package airportrobot

type Greeter interface {
	Greet(name string) string
}

func SayHello(name string, greeter Greeter) string {
	return greeter.Greet(name)
}

type Italian struct{}

func (i Italian) Greet(name string) string {
	return "I can speak Italian: Ciao " + name + "!"
}

type Portuguese struct{}

func (p Portuguese) Greet(name string) string {
	return "I can speak Portuguese: Olá " + name + "!"
}