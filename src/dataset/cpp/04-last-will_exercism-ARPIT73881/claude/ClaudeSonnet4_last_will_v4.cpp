// Enter your code below the lines of the families' information

// Secret knowledge of the Zhang family:
namespace zhang {
    constexpr int zhang_part = 8541;
    
    constexpr int bank_number_part(int secret_modifier) noexcept {
        return (zhang_part * secret_modifier) % 10000;
    }
    namespace red {
        constexpr int code_fragment() noexcept { return 512; }
    }
    namespace blue {
        constexpr int code_fragment() noexcept { return 677; }
    }
}

// Secret knowledge of the Khan family:
namespace khan {
    constexpr int khan_part = 4142;
    
    constexpr int bank_number_part(int secret_modifier) noexcept {
        return (khan_part * secret_modifier) % 10000;
    }
    namespace red {
        constexpr int code_fragment() noexcept { return 148; }
    }
    namespace blue {
        constexpr int code_fragment() noexcept { return 875; }
    }
}

// Secret knowledge of the Garcia family:
namespace garcia {
    constexpr int garcia_part = 4023;
    
    constexpr int bank_number_part(int secret_modifier) noexcept {
        return (garcia_part * secret_modifier) % 10000;
    }
    namespace red {
        constexpr int code_fragment() noexcept { return 118; }
    }
    namespace blue {
        constexpr int code_fragment() noexcept { return 923; }
    }
}

// Enter your code below
namespace estate_executor {
    constexpr int assemble_account_number(int secret_modifier) noexcept {
        return ((zhang::zhang_part + khan::khan_part + garcia::garcia_part) * secret_modifier) % 10000;
    }
    
    constexpr int assemble_code() noexcept {
        constexpr int blue_sum = zhang::blue::code_fragment() + 
                                khan::blue::code_fragment() + 
                                garcia::blue::code_fragment();
        constexpr int red_sum = zhang::red::code_fragment() + 
                               khan::red::code_fragment() + 
                               garcia::red::code_fragment();
        return blue_sum * red_sum;
    }
}