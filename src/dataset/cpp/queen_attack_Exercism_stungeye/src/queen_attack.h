#if !defined(QUEEN_ATTACK_H)
#define QUEEN_ATTACK_H

#include <string>
#include <utility>

namespace queen_attack {

	using position = std::pair<int, int>;

	class chess_board {
		position m_white{ 0, 3 };
		position m_black{ 7, 3 };

	public:
		chess_board() = default;
		chess_board(position white, position black);
		position white() const;
		position black() const;
		bool can_attack() const;

		operator std::string() const;
	};

}  // namespace queen_attack

#endif // QUEEN_ATTACK_H