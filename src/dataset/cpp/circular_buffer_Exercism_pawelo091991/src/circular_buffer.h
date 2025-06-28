#if !defined(CIRCULAR_BUFFER_H)
#define CIRCULAR_BUFFER_H
#include <stdexcept>
#include <vector>

namespace circular_buffer {
	template<typename T>
	class circular_buffer {
		std::vector<T> buffer;
		int size;
	public:
		circular_buffer(int size);
		T read();
		void write(T n);
		void clear();
		void overwrite(T n);
	};
}  // namespace circular_buffer

#endif // CIRCULAR_BUFFER_H