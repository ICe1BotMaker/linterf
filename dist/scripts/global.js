"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.global = void 0;
class global {
    constructor() {
        this.libraries = [
            { "type": "library", "name": "TCG", "version": "0.0.1" }
        ];
    }
    getLibraries() {
        return this.libraries;
    }
}
exports.global = global;
