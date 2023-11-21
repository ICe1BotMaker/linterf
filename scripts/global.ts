export interface Iglobal {
    type: string;
    name: string;
    version: string;
}

export class global {
    public libraries: Array<object> = [
        { "type": "library", "name": "TCG", "version": "0.0.1" }
    ];

    public getLibraries() {
        return this.libraries;
    }
}