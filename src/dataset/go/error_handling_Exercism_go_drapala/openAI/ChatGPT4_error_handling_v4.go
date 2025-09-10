package erratum

func IsTransient(err error) bool {
	_, ok := err.(TransientError)
	return ok
}

func Use(opener ResourceOpener, input string) (err error) {
	var resource Resource
	for {
		resource, err = opener()
		if err == nil || !IsTransient(err) {
			break
		}
	}
	if err != nil {
		return err
	}
	defer resource.Close()

	defer func() {
		if p := recover(); p != nil {
			switch e := p.(type) {
			case FrobError:
				resource.Defrob(e.defrobTag)
				err = e.inner
			case error:
				err = e
			default:
				panic(p)
			}
		}
	}()

	resource.Frob(input)
	return err
}