#include "robot_name.h"
#include <random>
#include <string>

namespace robot_name {

class robot {
private:
    std::string final_name;
    static thread_local std::mt19937 rng;
    static thread_local std::uniform_int_distribution<int> letter_dist;
    static thread_local std::uniform_int_distribution<int> digit_dist;
    static thread_local bool initialized;
    
    static void init_rng() {
        if (!initialized) {
            rng.seed(std::random_device{}());
            initialized = true;
        }
    }

public:
    std::string gen_letters() {
        init_rng();
        return std::string(1, static_cast<char>(letter_dist(rng) + 'A'));
    }

    std::string gen_numbers() {
        init_rng();
        return std::string(1, static_cast<char>(digit_dist(rng) + '0'));
    }

    std::string make_name() {
        init_rng();
        std::string result;
        result.reserve(5);
        
        result += static_cast<char>(letter_dist(rng) + 'A');
        result += static_cast<char>(letter_dist(rng) + 'A');
        result += static_cast<char>(digit_dist(rng) + '0');
        result += static_cast<char>(digit_dist(rng) + '0');
        result += static_cast<char>(digit_dist(rng) + '0');
        
        return result;
    }

    std::string name() const {
        return final_name;
    }

    void reset() {
        final_name = make_name();
    }

    robot() : final_name(make_name()) {}
};

thread_local std::mt19937 robot::rng;
thread_local std::uniform_int_distribution<int> robot::letter_dist(0, 25);
thread_local std::uniform_int_distribution<int> robot::digit_dist(0, 9);
thread_local bool robot::initialized = false;

}