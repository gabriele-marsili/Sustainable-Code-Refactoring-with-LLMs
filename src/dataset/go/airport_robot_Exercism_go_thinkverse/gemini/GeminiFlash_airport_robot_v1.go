package airportrobot

import (
	"fmt"
	"strings"
)

// Write your code here.
// This exercise does not have tests for each individual task.
// Try to solve all the tasks first before running the tests.
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

func (i Italian) Greet(name string) string {
	var sb strings.Builder
	sb.WriteString("Ciao ")
	sb.WriteString(name)
	sb.WriteString("!")
	return sb.String()
}

func (i Italian) LanguageName() string {
	return "Italian"
}

func (p Portuguese) Greet(name string) string {
	var sb strings.Builder
	sb.WriteString("Olá ")
	sb.WriteString(name)
	sb.WriteString("!")
	return sb.String()
}

func (p Portuguese) LanguageName() string {
	return "Portuguese"
}