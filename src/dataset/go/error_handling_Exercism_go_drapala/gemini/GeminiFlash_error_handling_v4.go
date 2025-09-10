package erratum

import "errors"

// IsTransient returns a boolean indicating whether the error is of type TransientError. It is satisfied by TransientError.
func IsTransient(err error) bool {
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
		if r := recover(); r != nil {
			frobErr, ok := r.(FrobError)
			if ok {
				resource.Defrob(frobErr.defrobTag)
				err = frobErr.inner
			} else {
				err, ok = r.(error)
				if !ok {
					err = errors.New("unknown panic")
				}
			}
		}
	}()

	resource.Frob(input)
	return err
}