#if !defined(GRAINS_H)
#define GRAINS_H

namespace grains {
    unsigned long long square(short square_num);
    unsigned long long square_bit_shift(short square_num);
    unsigned long long square_std_pow(short square_num);
    unsigned long long total();
    void validate(short square_num);
}  // namespace grains

#endif // GRAINS_H