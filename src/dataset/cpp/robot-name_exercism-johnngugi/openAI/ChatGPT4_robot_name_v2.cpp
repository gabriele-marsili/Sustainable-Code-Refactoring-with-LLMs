#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>
using namespace std;
using namespace robot_name;

class robot {
private:
    string final_name;
    static mt19937 rng; // Use Mersenne Twister for better random number generation
    static uniform_int_distribution<int> letter_dist;
    static uniform_int_distribution<int> number_dist;

    static char gen_letter() {
        return static_cast<char>(letter_dist(rng));
    }

    static char gen_number() {
        return static_cast<char>('0' + number_dist(rng));
    }

    static string make_name() {
        string current;
        current.reserve(5); // Reserve space to avoid reallocations
        current += gen_letter();
        current += gen_letter();
        current += gen_number();
        current += gen_number();
        current += gen_number();
        return current;
    }

public:
    robot() : final_name(make_name()) {
        cout << final_name << endl;
    }

    string name() const {
        return final_name;
    }

    void reset() {
        final_name = make_name();
    }
};

// Initialize static members
mt19937 robot::rng(random_device{}());
uniform_int_distribution<int> robot::letter_dist('A', 'Z');
uniform_int_distribution<int> robot::number_dist(0, 9);