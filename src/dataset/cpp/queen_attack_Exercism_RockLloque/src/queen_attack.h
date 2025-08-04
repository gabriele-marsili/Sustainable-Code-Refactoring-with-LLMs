#ifndef QUEEN_ATTACK_H
#define QUEEN_ATTACK_H
#include <utility>
#include <string>
#include <array>
namespace queen_attack
{
	class chess_board
	{
		public:
			chess_board() {}
			chess_board(std::pair<int, int> const& , std::pair<int, int> const& ); 

			std::pair<int, int> white() const;
			std::pair<int, int> black() const;
			bool can_attack() const;
			operator std::string() const;
		private:
			const std::pair<int, int> white_ { std::make_pair(0,3)};
			const std::pair<int, int> black_ { std::make_pair(7,3)};
	};
}

#endif