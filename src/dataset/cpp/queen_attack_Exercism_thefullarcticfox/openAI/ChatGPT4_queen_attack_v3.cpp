#include "queen_attack.h"
#include <stdexcept>
#include <array>
using namespace std;

namespace queen_attack {
    chess_board::chess_board(const pair<int, int>& w, const pair<int, int>& b) : arr(8, "________") {
        if (w == b)
            throw std::domain_error("same positions");
        arr[w.first][w.second] = 'W';
        arr[b.first][b.second] = 'B';
    }

    chess_board::operator std::string() const {
        std::string res;
        res.reserve(128); // Preallocate memory for 8x16 board representation
        for (const auto& row : arr) {
            for (char cell : row) {
                res += cell;
                res += ' ';
            }
            res.back() = '\n'; // Replace last space with newline
        }
        return res;
    }

    pair<int, int> chess_board::white() const {
        for (size_t i = 0; i < arr.size(); ++i) {
            size_t j = arr[i].find('W');
            if (j != string::npos)
                return {i, j};
        }
        throw std::runtime_error("no white queen");
    }

    pair<int, int> chess_board::black() const {
        for (size_t i = 0; i < arr.size(); ++i) {
            size_t j = arr[i].find('B');
            if (j != string::npos)
                return {i, j};
        }
        throw std::runtime_error("no black queen");
    }

    bool chess_board::can_attack() const {
        auto [w_row, w_col] = white();
        auto [b_row, b_col] = black();
        return w_row == b_row || w_col == b_col || abs(w_row - b_row) == abs(w_col - b_col);
    }
}  // namespace queen_attack