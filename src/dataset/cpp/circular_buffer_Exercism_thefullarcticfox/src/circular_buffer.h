#if !defined(CIRCULAR_BUFFER_H)
#define CIRCULAR_BUFFER_H
#include <stdexcept>
#include <deque>

namespace circular_buffer {
	template <class T>
	class circular_buffer {
	private:
		std::deque<T>	_buf;
		size_t			_cap;
	public:
		explicit
		circular_buffer(int capacity) : _cap(capacity) {}

		T		read() {
			if (_buf.empty())
				throw std::domain_error("buffer is empty");
			T	data = _buf.front();
			_buf.pop_front();
			return data;
		}

		void	write(const T& data) {
			if (_cap == _buf.size())
				throw std::domain_error("buffer is full");
			_buf.push_back(data);
		}

		void	overwrite(const T& data) {
			if (_cap != _buf.size())
				write(data);
			else {
				_buf.pop_front();
				write(data);
			}
		}

		void	clear() {
			_buf.clear();
		}
	};
}  // namespace circular_buffer

#endif // CIRCULAR_BUFFER_H
