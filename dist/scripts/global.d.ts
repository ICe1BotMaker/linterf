export interface Iglobal {
    type: string;
    name: string;
    version: string;
}
export declare class global {
    libraries: Array<object>;
    getLibraries(): object[];
}
