package airportrobot

import "strings"

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

type Italian struct{}
type Portuguese struct{}

func SayHello(name string, greeter Greeter) string {
	var builder strings.Builder
	builder.Grow(len("I can speak ") + len(greeter.LanguageName()) + len(": ") + len(greeter.Greet(name)))
	builder.WriteString("I can speak ")
	builder.WriteString(greeter.LanguageName())
	builder.WriteString(": ")
	builder.WriteString(greeter.Greet(name))
	return builder.String()
}

func (i Italian) Greet(name string) string {
	var builder strings.Builder
	builder.Grow(len("Ciao !") + len(name))
	builder.WriteString("Ciao ")
	builder.WriteString(name)
	builder.WriteByte('!')
	return builder.String()
}

func (i Italian) LanguageName() string {
	return "Italian"
}

func (p Portuguese) Greet(name string) string {
	var builder strings.Builder
	builder.Grow(len("Olá !") + len(name))
	builder.WriteString("Olá ")
	builder.WriteString(name)
	builder.WriteByte('!')
	return builder.String()
}

func (p Portuguese) LanguageName() string {
	return "Portuguese"
}