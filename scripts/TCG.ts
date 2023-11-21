import chalk from "chalk";
import { Iglobal, global } from "./global";

export class TCG extends global implements Iglobal {
    public type: string = `library`;
    public name: string = `TCG`;
    public version: string = `0.0.1`;

    /**
     * TCG Protocol (not supported) - LATEST 0.0.1b
     * Provide online socket communication
     */
    public protocol() {
        console.log(chalk.bgGray(` * `) + chalk.bgBlue(` TCG Protocol `) + chalk.red(` This feature is not yet supported.`));
        console.log(this.getLibraries());
    }

    /**
     * TCG Process - LATEST 1.0.14
     * The last function to be executed.
     */
    public process() {
        console.log(chalk.bgGray(` * `) + chalk.bgBlue(` TCG Process `) + chalk.red(` This feature is not yet supported.`));
    }

    /**
     * TCG Designer - LATEST 1.0.8
     * Canvas and TCG designer
     */
    public designer(params: object) {
        
    }
}

const tcg=new TCG();
tcg.designer({})