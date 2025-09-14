export default class PhoneNumber {
    private readonly _number: string | undefined

    constructor(rawPhoneNumber: string) {
        // Early exit for empty strings
        if (!rawPhoneNumber) {
            return
        }

        // Single pass validation and extraction
        let digitCount = 0
        let digits = ''
        
        for (let i = 0; i < rawPhoneNumber.length; i++) {
            const char = rawPhoneNumber[i]
            
            // Check valid characters inline
            if (char >= '0' && char <= '9') {
                digits += char
                digitCount++
                // Early exit if too many digits
                if (digitCount > 11) {
                    return
                }
            } else if (char !== '.' && char !== '(' && char !== ')' && char !== '-' && char !== ' ') {
                return
            }
        }

        // Validate length and set number
        if (digitCount === 10) {
            this._number = digits
        } else if (digitCount === 11 && digits[0] === '1') {
            this._number = digits.slice(1)
        }
    }

    number() {
        return this._number
    }
}