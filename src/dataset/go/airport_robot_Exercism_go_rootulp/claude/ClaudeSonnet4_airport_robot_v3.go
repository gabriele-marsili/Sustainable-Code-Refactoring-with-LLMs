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

const italianLanguage = "Italian"
const italianGreeting = "I can speak Italian: Ciao %s!"

func (i Italian) LanguageName() string {
	return italianLanguage
}

func (i Italian) Greet(name string) string {
	return fmt.Sprintf(italianGreeting, name)
}

type Portuguese struct{}

const portugueseLanguage = "Portuguese"
const portugueseGreeting = "I can speak Portuguese: Olá %s!"

func (p Portuguese) LanguageName() string {
	return portugueseLanguage
}

func (p Portuguese) Greet(name string) string {
	return fmt.Sprintf(portugueseGreeting, name)
}