"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    static isScreaming(input) {
        return /^[0-9A-Z?,!%^^@#$(*\s]+$/.test(input);
    }
    static isQuestion(input) {
        return input.trim().endsWith('?');
    }
    static hasLetters(input) {
        return /[a-zA-Z]/.test(input);
    }
    static isSilence(input) {
        return input.trim() === '';
    }
    hey(input) {
        if (Bob.isSilence(input)) {
            return 'Fine. Be that way!';
        }
        else if (Bob.isQuestion(input)) {
            if (Bob.isScreaming(input) && Bob.hasLetters(input)) {
                return "Calm down, I know what I'm doing!";
            }
            else {
                return "Sure.";
            }
        }
        else if (!Bob.hasLetters(input)) {
            return "Whatever.";
        }
        else if (Bob.isScreaming(input)) {
            return 'Whoa, chill out!';
        }
        else {
            return "Whatever.";
        }
    }
}
exports.default = Bob;
