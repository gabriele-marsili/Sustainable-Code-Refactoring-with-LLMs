class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0:
            return "0"
        
        sign = "-" if (numerator < 0) ^ (denominator < 0) else ""
        numerator, denominator = abs(numerator), abs(denominator)
        
        integer_part = numerator // denominator
        remainder = numerator % denominator
        if remainder == 0:
            return f"{sign}{integer_part}"
        
        fraction = []
        remainder_map = {}
        while remainder:
            if remainder in remainder_map:
                fraction.insert(remainder_map[remainder], '(')
                fraction.append(')')
                break
            remainder_map[remainder] = len(fraction)
            remainder *= 10
            fraction.append(str(remainder // denominator))
            remainder %= denominator
        
        return f"{sign}{integer_part}." + ''.join(fraction)