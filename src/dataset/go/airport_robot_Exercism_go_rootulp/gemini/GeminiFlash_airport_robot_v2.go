package airportrobot

type Greeter interface {
	LanguageName() string
	Greet(name string) string
}

func SayHello(name string, greeter Greeter) string {
	return greeter.Greet(name)
}

type Italian struct{}

const italianLanguageName = "Italian"

func (Italian) LanguageName() string {
	return italianLanguageName
}

func (Italian) Greet(name string) string {
	return "I can speak " + italianLanguageName + ": Ciao " + name + "!"
}

type Portuguese struct{}

const portugueseLanguageName = "Portuguese"

func (Portuguese) LanguageName() string {
	return portugueseLanguageName
}

func (Portuguese) Greet(name string) string {
	return "I can speak " + portugueseLanguageName + ": Olá " + name + "!"
}