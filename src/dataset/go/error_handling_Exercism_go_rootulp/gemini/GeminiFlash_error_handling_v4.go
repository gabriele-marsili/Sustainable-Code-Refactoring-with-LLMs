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
			switch e := r.(type) {
			case FrobError:
				resource.Defrob(e.defrobTag)
				err = e
			case error:
				err = e
			default:
				err = fmt.Errorf("panic: %v", r)
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
		if _, ok := err.(TransientError); !ok {
			return nil, err
		}
	}
	return f()
}