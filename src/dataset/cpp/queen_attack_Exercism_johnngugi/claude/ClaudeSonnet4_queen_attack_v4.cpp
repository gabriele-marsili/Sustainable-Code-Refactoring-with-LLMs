#include <sstream>
#include "queen_attack.h"

using namespace std;

namespace queen_attack {
    typedef std::pair<int, int> square;

    square chess_board::white() const {
        return white_queen;
    }

    square chess_board::black() const {
        return black_queen;
    }

    bool chess_board::can_attack() const {
        const int row_diff = white_queen.first - black_queen.first;
        const int col_diff = white_queen.second - black_queen.second;
        
        return row_diff == 0 || col_diff == 0 || (row_diff * row_diff == col_diff * col_diff);
    }

    chess_board::operator std::string() const {
        string result;
        result.reserve(120);
        
        for (int i = 0; i < 8; ++i) {
            for (int j = 0; j < 8; ++j) {
                if (i == white_queen.first && j == white_queen.second) {
                    result += 'W';
                } else if (i == black_queen.first && j == black_queen.second) {
                    result += 'B';
                } else {
                    result += '_';
                }
                if (j < 7) {
                    result += ' ';
                }
            }
            result += '\n';
        }
        return result;
    }
}