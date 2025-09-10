package airportrobot

import (
	"fmt"
	"strings"
)

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

func SayHello(name string, greeter Greeter) string {
	return greeter.Greet(name)
}

type Italian struct{}

const italianLanguageName = "Italian"
const italianGreeting = "Ciao"

func (Italian) LanguageName() string {
	return italianLanguageName
}

func (Italian) Greet(name string) string {
	var buffer strings.Builder
	buffer.WriteString("I can speak ")
	buffer.WriteString(italianLanguageName)
	buffer.WriteString(": ")
	buffer.WriteString(italianGreeting)
	buffer.WriteString(" ")
	buffer.WriteString(name)
	buffer.WriteString("!")
	return buffer.String()
}

type Portuguese struct{}

const portugueseLanguageName = "Portuguese"
const portugueseGreeting = "Olá"

func (Portuguese) LanguageName() string {
	return portugueseLanguageName
}

func (Portuguese) Greet(name string) string {
	var buffer strings.Builder
	buffer.WriteString("I can speak ")
	buffer.WriteString(portugueseLanguageName)
	buffer.WriteString(": ")
	buffer.WriteString(portugueseGreeting)
	buffer.WriteString(" ")
	buffer.WriteString(name)
	buffer.WriteString("!")
	return buffer.String()
}