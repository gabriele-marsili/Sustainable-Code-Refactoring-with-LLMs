package airportrobot

import "strings"

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
	var sb strings.Builder
	sb.WriteString("I can speak Italian: Ciao ")
	sb.WriteString(name)
	sb.WriteString("!")
	return sb.String()
}

type Portuguese struct{}

func (Portuguese) LanguageName() string {
	return "Portuguese"
}

func (Portuguese) Greet(name string) string {
	var sb strings.Builder
	sb.WriteString("I can speak Portuguese: Olá ")
	sb.WriteString(name)
	sb.WriteString("!")
	return sb.String()
}