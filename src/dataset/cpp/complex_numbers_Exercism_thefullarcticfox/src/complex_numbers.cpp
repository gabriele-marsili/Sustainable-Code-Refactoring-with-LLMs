#include "complex_numbers.h"
#include <stdexcept>
#include <cmath>

namespace complex_numbers {
	Complex::Complex(double real, double imag) : _real(real), _imag(imag) {}

	double	Complex::real() const {
		return _real;
	}

	double	Complex::imag() const {
		return _imag;
	}

	double	Complex::abs() const {
		return sqrt(_real * _real + _imag * _imag);
	}

	Complex	Complex::conj() const {
		return Complex(_real, -_imag);
	}

	Complex	Complex::exp() const {
		//	e^(a + i * b) = e^a * (cos(b) + i * sin(b))		(Euler's formula)
		double	muitiplier = pow(M_E, _real);
		return Complex(muitiplier * cos(_imag), muitiplier * sin(_imag));
	}

	Complex	Complex::operator+(const Complex& other) const {
		return Complex(this->_real + other._real, this->_imag + other._imag);
	}

	Complex	Complex::operator-(const Complex& other) const {
		return Complex(this->_real - other._real, this->_imag - other._imag);
	}

	Complex	Complex::operator*(const Complex& other) const {
		//	(a + i * b) * (c + i * d) = (a * c - b * d) + (b * c + a * d) * i
		double	res_real = this->_real * other._real - this->_imag * other._imag;
		double	res_imag = this->_imag * other._real + this->_real * other._imag;
		return Complex(res_real, res_imag);
	}

	Complex	Complex::operator/(const Complex& other) const {
		//	(a + i * b) / (c + i * d) = (a * c + b * d) / (c^2 + d^2) + (b * c - a * d) / (c^2 + d^2) * i
		if (other._real == 0 && other._imag == 0)
			throw std::domain_error("division by zero");

		double	res_real = (this->_real * other._real + this->_imag * other._imag) /
							(other._real * other._real + other._imag * other._imag);
		double	res_imag = (this->_imag * other._real - this->_real * other._imag) /
							(other._real * other._real + other._imag * other._imag);
		return Complex(res_real, res_imag);
	}
}  // namespace complex_numbers
