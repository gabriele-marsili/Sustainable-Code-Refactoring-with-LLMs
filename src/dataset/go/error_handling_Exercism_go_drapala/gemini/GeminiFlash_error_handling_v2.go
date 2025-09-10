package erratum

import "fmt"

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
			if frobErr, ok := r.(FrobError); ok {
				resource.Defrob(frobErr.defrobTag)
				err = frobErr.inner
			} else if e, ok := r.(error); ok {
				err = e
			} else {
				err = fmt.Errorf("panic: %v", r) // Convert non-error panics to errors
			}
		}
	}()

	resource.Frob(input)
	return err
}