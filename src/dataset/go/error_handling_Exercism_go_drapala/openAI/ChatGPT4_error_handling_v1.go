package erratum

func IsTransient(err error) bool {
	_, ok := err.(TransientError)
	return ok
}

func Use(opener ResourceOpener, input string) (err error) {
	var resource Resource
	for {
		resource, err = opener()
		if err == nil {
			break
		}
		if !IsTransient(err) {
			return err
		}
	}

	defer func() {
		if r := recover(); r != nil {
			switch p := r.(type) {
			case FrobError:
				resource.Defrob(p.defrobTag)
				err = p.inner
			case error:
				err = p
			default:
				panic(r)
			}
		}
		resource.Close()
	}()

	resource.Frob(input)
	return err
}