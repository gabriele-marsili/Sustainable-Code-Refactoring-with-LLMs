#if !defined(COMPLEX_NUMBERS_H)
#define COMPLEX_NUMBERS_H

namespace complex_numbers {
	class Complex {
	private:
		double	_real;
		double	_imag;
	public:
		Complex(double real, double imag);

		double	real() const;
		double	imag() const;
		double	abs() const;
		Complex	conj() const;
		Complex	exp() const;

		Complex	operator+(const Complex& other) const;
		Complex	operator-(const Complex& other) const;
		Complex	operator*(const Complex& other) const;
		Complex	operator/(const Complex& other) const;
	};
}  // namespace complex_numbers

#endif  // COMPLEX_NUMBERS_H
