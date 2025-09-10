package erratum

func IsTransient(err error) bool {
	_, ok := err.(TransientError)
	return ok
}

func Use(opener ResourceOpener, input string) (err error) {
	for {
		resource, errResource := opener()
		if errResource != nil {
			if IsTransient(errResource) {
				continue
			}
			return errResource
		}

		defer resource.Close()

		defer func() {
			if p := recover(); p != nil {
				if frobErr, ok := p.(FrobError); ok {
					resource.Defrob(frobErr.defrobTag)
					err = frobErr.inner
				} else if panicErr, ok := p.(error); ok {
					err = panicErr
				}
			}
		}()

		resource.Frob(input)
		return nil
	}
}