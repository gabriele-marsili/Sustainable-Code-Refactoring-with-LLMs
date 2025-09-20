"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    square(field) {
        if (field < 1 || field > 64) {
            return -1;
        }
        return field === 1 ? 1 : 1 << (field - 1);
    },
    total: () => 0xFFFFFFFFFFFFFFFF
};
