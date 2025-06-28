#if !defined(BINARY_SEARCH_TREE_H)
#define BINARY_SEARCH_TREE_H

namespace binary_search_tree {
    template<typename T>
    class binary_tree {
        private:
            T _data;

        public:
            binary_tree();

            T& data() const;
            T left();
            T right();
            void insert(T item);
    };
}  // namespace binary_search_tree

#endif // BINARY_SEARCH_TREE_H