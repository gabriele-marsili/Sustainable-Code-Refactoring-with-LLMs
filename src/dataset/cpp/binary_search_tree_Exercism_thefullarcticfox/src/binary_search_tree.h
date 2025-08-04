#if !defined(BINARY_SEARCH_TREE_H)
#define BINARY_SEARCH_TREE_H
#include <memory>
#include <iterator>

namespace binary_search_tree {

	template<class T>
	class binary_tree {
	private:
		using tree_uptr = typename std::unique_ptr<binary_tree>;
		T				_data;
		binary_tree*	_parent;
		tree_uptr		_left, _right;

		static const binary_tree*	_tree_min(const binary_tree* _ptr) {
			while (_ptr->_left != nullptr)
				_ptr = _ptr->_left.get();
			return _ptr;
		}

		static const binary_tree*	_tree_max(const binary_tree* _ptr) {
			while (_ptr->_right != nullptr)
				_ptr = _ptr->_right.get();
			return _ptr;
		}
	public:
		explicit
		binary_tree(const T& data, binary_tree* parent = nullptr) :
			_data(data), _parent(parent), _left(nullptr), _right(nullptr) {}

		//	accessors
		T&					data()				{ return _data; }
		const T&			data()		const	{ return _data; }
		tree_uptr&			left()				{ return _left; }
		const tree_uptr&	left()		const	{ return _left; }
		tree_uptr&			right()				{ return _right; }
		const tree_uptr&	right()		const	{ return _right; }
		binary_tree*		parent()			{ return _parent; }
		const binary_tree*	parent()	const	{ return _parent; }

		//	inserter
		void	insert(const T& data) {
			if (data <= _data) {
				if (_left == nullptr)
					_left = std::make_unique<binary_tree>(data, this);
				else
					_left->insert(data);
			} else {
				if (_right == nullptr)
					_right = std::make_unique<binary_tree>(data, this);
				else
					_right->insert(data);
			}
		}

		//	iterator class
		class const_iterator {
		private:
			const binary_tree*	_ptr;
		public:
			typedef T				value_type;
			typedef std::ptrdiff_t	difference_type;
			typedef const T*		pointer;
			typedef const T&		reference;
			typedef std::bidirectional_iterator_tag	iterator_category;

			explicit
			const_iterator(const binary_tree* ptr = nullptr) : _ptr(ptr) {}

			bool			operator==(const const_iterator& other) const
			{	return this->_ptr == other._ptr;	}
			bool			operator!=(const const_iterator& other) const
			{	return !(*this == other);			}

			reference		operator*() const { return _ptr->_data; }
			pointer			operator->() const { return &(_ptr->_data); }

			const_iterator&	operator++() {
				if (_ptr->_right != nullptr)
					_ptr = _tree_min(_ptr->_right.get());
				else {		//	ascend back
					while (_ptr->_parent != nullptr &&
						_ptr == _ptr->_parent->_right.get())
						_ptr = _ptr->_parent;
					_ptr = _ptr->_parent;
				}
				return *this;
			}

			const_iterator&	operator--() {
				if (_ptr->_left != nullptr)
					_ptr = _tree_max(_ptr->_left.get());
				else {		//	ascend back
					while (_ptr->_parent != nullptr &&
						_ptr == _ptr->_parent->_left.get())
						_ptr = _ptr->_parent;
					_ptr = _ptr->_parent;
				}
				return *this;
			}

			const_iterator	operator++(int)
			{	const_iterator it = *this; ++(*this); return it; }
			const_iterator	operator--(int)
			{	const_iterator it = *this; --(*this); return it; }
		};

		//	iterators
		const_iterator	begin()		const {	return const_iterator(_tree_min(this));	};
		const_iterator	rbegin()	const {	return const_iterator(_tree_max(this));	};
		const_iterator	end()		const {	return const_iterator(); }
	};
}  // namespace binary_search_tree

#endif // BINARY_SEARCH_TREE_H
