package erratum

// IsTransient returns a boolean indicating whether the error is of type TransientError. It is satisfied by TransientError.
func IsTransient(err error) bool {
	if err == nil {
		return false
	}
	_, ok := err.(TransientError)
	return ok
}

func Use(opener ResourceOpener, input string) (err error) {
	var resource Resource
	var errResource error
	
	for {
		resource, errResource = opener()
		if errResource == nil {
			break
		}
		if !IsTransient(errResource) {
			return errResource
		}
	}

	defer resource.Close()

	defer func() {
		if p := recover(); p != nil {
			switch frobErr := p.(type) {
			case FrobError:
				resource.Defrob(frobErr.defrobTag)
				err = frobErr.inner
			default:
				err = p.(error)
			}
		}
	}()

	resource.Frob(input)
	return err
}