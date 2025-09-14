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
	// Open a resource via opener
	resource, errResource := opener()
	
	// Keep trying if TransientError
	for errResource != nil && IsTransient(errResource) {
		resource, errResource = opener()
	}
	
	if errResource != nil {
		return errResource
	}
	
	// Defer closing
	defer resource.Close()

	// Defer in case of panic
	defer func() {
		if p := recover(); p != nil {
			if frobErr, ok := p.(FrobError); ok {
				// Defrob using defrobTag
				resource.Defrob(frobErr.defrobTag)
				// Set error for return out of Use
				err = frobErr.inner
			} else {
				// Not a FrobError - so return the error
				err = p.(error)
			}
		}
	}()
	
	// Call Frob(input)
	resource.Frob(input)
	return err
}