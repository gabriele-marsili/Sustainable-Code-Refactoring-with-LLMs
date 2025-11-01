// Enter your code below the lines of the families' information

// Secret knowledge of the Zhang family:
namespace zhang {
    constexpr int zhang_part = 8'541;
    int bank_number_part(int secret_modifier) {
        return (zhang_part * secret_modifier) % 10000;
    }
    namespace red {
        constexpr int code_fragment_value = 512;
        constexpr int code_fragment() { return code_fragment_value; }
    }
    namespace blue {
        constexpr int code_fragment_value = 677;
        constexpr int code_fragment() { return code_fragment_value; }
    }
}

// Secret knowledge of the Khan family:
namespace khan {
    constexpr int khan_part = 4'142;
    int bank_number_part(int secret_modifier) {
        return (khan_part * secret_modifier) % 10000;
    }
    namespace red {
        constexpr int code_fragment_value = 148;
        constexpr int code_fragment() { return code_fragment_value; }
    }
    namespace blue {
        constexpr int code_fragment_value = 875;
        constexpr int code_fragment() { return code_fragment_value; }
    }
}

// Secret knowledge of the Garcia family:
namespace garcia {
    constexpr int garcia_part = 4'023;
    int bank_number_part(int secret_modifier) {
        return (garcia_part * secret_modifier) % 10000;
    }
    namespace red {
        constexpr int code_fragment_value = 118;
        constexpr int code_fragment() { return code_fragment_value; }
    }
    namespace blue {
        constexpr int code_fragment_value = 923;
        constexpr int code_fragment() { return code_fragment_value; }
    }
}

// Enter your code below
namespace estate_executor {
    int assemble_account_number(int secret_modifier) {
        return (zhang::zhang_part + khan::khan_part + garcia::garcia_part) * secret_modifier % 10000;
    }
    int assemble_code() {
        constexpr int blue_sum = zhang::blue::code_fragment_value +
            khan::blue::code_fragment_value +
            garcia::blue::code_fragment_value;
        constexpr int red_sum = zhang::red::code_fragment_value +
            khan::red::code_fragment_value +
            garcia::red::code_fragment_value;
        return blue_sum * red_sum;
    }
}