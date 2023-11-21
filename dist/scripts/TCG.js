"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCG = void 0;
const chalk_1 = __importDefault(require("chalk"));
const global_1 = require("./global");
class TCG extends global_1.global {
    constructor() {
        super(...arguments);
        this.type = `library`;
        this.name = `TCG`;
        this.version = `0.0.1`;
    }
    /**
     * TCG Protocol (not supported) - LATEST 0.0.1b
     * Provide online socket communication
     */
    protocol() {
        console.log(chalk_1.default.bgGray(` * `) + chalk_1.default.bgBlue(` TCG Protocol `) + chalk_1.default.red(` This feature is not yet supported.`));
        console.log(this.getLibraries());
    }
    /**
     * TCG Process - LATEST 1.0.14
     * The last function to be executed.
     */
    process() {
        console.log(chalk_1.default.bgGray(` * `) + chalk_1.default.bgBlue(` TCG Process `) + chalk_1.default.red(` This feature is not yet supported.`));
    }
    /**
     * TCG Designer - LATEST 1.0.8
     * Canvas and TCG designer
     */
    designer(params) {
    }
}
exports.TCG = TCG;
const tcg = new TCG();
tcg.designer({});
