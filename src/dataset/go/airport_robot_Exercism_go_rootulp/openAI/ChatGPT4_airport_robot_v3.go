package airportrobot

import "fmt"

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

func SayHello(name string, greeter Greeter) string {
	return greeter.Greet(name)
}

type Italian struct{}

func (Italian) LanguageName() string {
	return "Italian"
}

func (Italian) Greet(name string) string {
	return "I can speak Italian: Ciao " + name + "!"
}

type Portuguese struct{}

func (Portuguese) LanguageName() string {
	return "Portuguese"
}

func (Portuguese) Greet(name string) string {
	return "I can speak Portuguese: Olá " + name + "!"
}