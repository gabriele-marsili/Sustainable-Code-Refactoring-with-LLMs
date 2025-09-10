package airportrobot

import "strings"

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

type Italian struct{}
type Portuguese struct{}

func SayHello(name string, greeter Greeter) string {
	var sb strings.Builder
	sb.WriteString("I can speak ")
	sb.WriteString(greeter.LanguageName())
	sb.WriteString(": ")
	sb.WriteString(greeter.Greet(name))
	return sb.String()
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