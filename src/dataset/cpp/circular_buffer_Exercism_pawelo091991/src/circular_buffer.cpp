#include "circular_buffer.h"

namespace circular_buffer {
	template<typename T>
	circular_buffer<T>::circular_buffer(int size) {
		this->size = size;
	}

	template<typename T>
	T circular_buffer<T>::read() {
		if (buffer.empty())
			throw std::domain_error("Buffer is empty");

		T return_value = *buffer.begin();
		buffer.erase(buffer.begin());
		return return_value;
	}

	template<typename T>
	void circular_buffer<T>::write(T n) {
		if (buffer.size() == size)
			throw std::domain_error("Buffer is full");

		buffer.push_back(n);
	}

	template<typename T>
	void circular_buffer<T>::clear() {
		buffer.erase(buffer.begin(), buffer.end());
	}

	template<typename T>
	void circular_buffer<T>::overwrite(T n) {
		if (buffer.size() < size)
			buffer.push_back(n);
		else {
			buffer.erase(buffer.begin());
			buffer.push_back(n);
		}
	}
}  // namespace circular_buffer
