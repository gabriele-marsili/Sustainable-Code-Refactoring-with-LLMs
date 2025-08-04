#include "queen_attack.h"
#include <stdexcept>
using namespace std;

namespace queen_attack {
	chess_board::chess_board(const pair<int, int>& w, const pair<int, int>& b) : arr(8, "________") {
		if (w == b)
			throw std::domain_error("same positions");
		arr.at(w.first).at(w.second) = 'W';
		arr.at(b.first).at(b.second) = 'B';
	}

	chess_board::operator	std::string() const {
		std::string	res(16 * 8, ' ');
		for (size_t i = 0; i < arr.size(); i++) {
			for (size_t j = 0; j < arr.at(i).size(); j++) {
				res.at(i * 16 + j * 2) = arr.at(i).at(j);
			}
			res.at(i * 16 + 15) = '\n';
		}
		return (res);
	}

	pair<int, int>	chess_board::white() const {
		for (size_t i = 0; i < arr.size(); i++)
			for (size_t j = 0; j < arr.at(i).size(); j++)
				if (arr.at(i).at(j) == 'W')
					return (std::make_pair(i, j));
		throw std::runtime_error("no white queen");
	}

	pair<int, int>	chess_board::black() const {
		for (size_t i = 0; i < arr.size(); i++)
			for (size_t j = 0; j < arr.at(i).size(); j++)
				if (arr.at(i).at(j) == 'B')
					return (std::make_pair(i, j));
		throw std::runtime_error("no black queen");
	}

	bool			chess_board::can_attack() const {
		pair<int, int>	w = white(), b = black();
		return (w.first == b.first || w.second == b.second ||
			std::abs(w.first - b.first) == std::abs(w.second - b.second));
	}
}  // namespace queen_attack
