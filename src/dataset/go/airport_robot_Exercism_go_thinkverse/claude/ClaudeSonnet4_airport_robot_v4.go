package airportrobot

import "strings"

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

type Italian struct{}
type Portuguese struct{}

var (
	italianLang = "Italian"
	portugueseLang = "Portuguese"
	ciaoPrefix = "Ciao "
	olaPrefix = "Olá "
	exclamation = "!"
	speakPrefix = "I can speak "
	separator = ": "
)

func SayHello(name string, greeter Greeter) string {
	var builder strings.Builder
	builder.Grow(len(speakPrefix) + len(greeter.LanguageName()) + len(separator) + len(greeter.Greet(name)))
	builder.WriteString(speakPrefix)
	builder.WriteString(greeter.LanguageName())
	builder.WriteString(separator)
	builder.WriteString(greeter.Greet(name))
	return builder.String()
}

func (i Italian) Greet(name string) string {
	var builder strings.Builder
	builder.Grow(len(ciaoPrefix) + len(name) + len(exclamation))
	builder.WriteString(ciaoPrefix)
	builder.WriteString(name)
	builder.WriteString(exclamation)
	return builder.String()
}

func (i Italian) LanguageName() string {
	return italianLang
}

func (p Portuguese) Greet(name string) string {
	var builder strings.Builder
	builder.Grow(len(olaPrefix) + len(name) + len(exclamation))
	builder.WriteString(olaPrefix)
	builder.WriteString(name)
	builder.WriteString(exclamation)
	return builder.String()
}

func (p Portuguese) LanguageName() string {
	return portugueseLang
}