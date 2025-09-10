package airportrobot

import "fmt"

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

type Italian struct{}
type Portuguese struct{}

func SayHello(name string, greeter Greeter) string {
	return fmt.Sprintf("I can speak %s: %s", greeter.LanguageName(), greeter.Greet(name))
}

func (Italian) Greet(name string) string {
	return "Ciao " + name + "!"
}

func (Italian) LanguageName() string {
	return "Italian"
}

func (Portuguese) Greet(name string) string {
	return "Olá " + name + "!"
}

func (Portuguese) LanguageName() string {
	return "Portuguese"
}