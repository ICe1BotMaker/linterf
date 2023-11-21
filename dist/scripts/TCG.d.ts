import { Iglobal, global } from "./global";
export declare class TCG extends global implements Iglobal {
    type: string;
    name: string;
    version: string;
    /**
     * TCG Protocol (not supported) - LATEST 0.0.1b
     * Provide online socket communication
     */
    protocol(): void;
    /**
     * TCG Process - LATEST 1.0.14
     * The last function to be executed.
     */
    process(): void;
    /**
     * TCG Designer - LATEST 1.0.8
     * Canvas and TCG designer
     */
    designer(params: object): void;
}
