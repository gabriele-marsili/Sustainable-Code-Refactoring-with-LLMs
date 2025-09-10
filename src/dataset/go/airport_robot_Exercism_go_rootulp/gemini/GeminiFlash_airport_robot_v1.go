package airportrobot

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

func SayHello(name string, greeter Greeter) string {
	return greeter.Greet(name)
}

type Italian struct{}

const italianLanguage = "Italian"
const italianGreeting = "Ciao"

func (Italian) LanguageName() string {
	return italianLanguage
}

func (Italian) Greet(name string) string {
	return "I can speak " + italianLanguage + ": " + italianGreeting + " " + name + "!"
}

type Portuguese struct{}

const portugueseLanguage = "Portuguese"
const portugueseGreeting = "Olá"

func (Portuguese) LanguageName() string {
	return portugueseLanguage
}

func (Portuguese) Greet(name string) string {
	return "I can speak " + portugueseLanguage + ": " + portugueseGreeting + " " + name + "!"
}