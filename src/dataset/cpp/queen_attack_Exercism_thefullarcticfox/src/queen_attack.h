#if !defined(QUEEN_ATTACK_H)
#define QUEEN_ATTACK_H
#include <string>
#include <vector>
#include <utility>

namespace queen_attack {
	class chess_board {
	private:
		std::vector<std::string>	arr;
	public:
		explicit
		chess_board(const std::pair<int, int>& w = {0, 3},
					const std::pair<int, int>& b = {7, 3});

		operator		std::string() const;

		std::pair<int, int>	white() const;
		std::pair<int, int>	black() const;

		bool			can_attack() const;
	};

}  // namespace queen_attack

#endif // QUEEN_ATTACK_H
