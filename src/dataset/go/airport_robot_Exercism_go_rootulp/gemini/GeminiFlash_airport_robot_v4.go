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

type Italian struct {
	languageName string
	greeting     string
}

func NewItalian() Italian {
	return Italian{
		languageName: "Italian",
		greeting:     "Ciao",
	}
}

func (i Italian) LanguageName() string {
	return i.languageName
}

func (i Italian) Greet(name string) string {
	var builder strings.Builder
	builder.WriteString("I can speak ")
	builder.WriteString(i.languageName)
	builder.WriteString(": ")
	builder.WriteString(i.greeting)
	builder.WriteString(" ")
	builder.WriteString(name)
	builder.WriteString("!")
	return builder.String()
}

type Portuguese struct {
	languageName string
	greeting     string
}

func NewPortuguese() Portuguese {
	return Portuguese{
		languageName: "Portuguese",
		greeting:     "Olá",
	}
}

func (p Portuguese) LanguageName() string {
	return p.languageName
}

func (p Portuguese) Greet(name string) string {
	var builder strings.Builder
	builder.WriteString("I can speak ")
	builder.WriteString(p.languageName)
	builder.WriteString(": ")
	builder.WriteString(p.greeting)
	builder.WriteString(" ")
	builder.WriteString(name)
	builder.WriteString("!")
	return builder.String()
}