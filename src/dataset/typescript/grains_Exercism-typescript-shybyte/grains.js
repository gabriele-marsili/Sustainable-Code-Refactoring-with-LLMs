"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    square(field) {
        if (field < 1 || field > 64) {
            return -1;
        }
        return Math.pow(2, (field - 1));
    },
    total: () => (Math.pow(2, 64)) - 1
};
