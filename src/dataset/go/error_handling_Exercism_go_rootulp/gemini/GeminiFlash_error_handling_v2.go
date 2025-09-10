package erratum

type opener func() (Resource, error)

func Use(open opener, s string) (err error) {
	var resource Resource
	resource, err = retry(open)
	if err != nil {
		return err
	}
	defer resource.Close()

	defer func() {
		if r := recover(); r != nil {
			if frobErr, ok := r.(FrobError); ok {
				resource.Defrob(frobErr.defrobTag)
				err = frobErr
			} else if e, ok := r.(error); ok {
				err = e
			} else {
				err = r.(error) //Re-panic if not an error type
			}
		}
	}()

	resource.Frob(s)
	return nil
}

func retry(f opener) (Resource, error) {
	var r Resource
	var err error
	for i := 0; i < 3; i++ {
		r, err = f()
		if err == nil {
			return r, nil
		}
	}
	return f()
}