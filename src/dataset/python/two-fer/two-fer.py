def two_fer(name=None):
	if name is None:
		X = "you"
	else:
		X = name
	string = ("One for {}, one for me.".format(X))
	return string
