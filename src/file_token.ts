 

export class File_Token {

    name: string;
    groups: Map<string,string>;
    imports: Map<string, string>; // This might be subject to change, we must include the import name, the line number, and the group it is in. Maybe a more complex object.

    constructor(name_:string){
        this.name = name_;
        this.groups = new Map<string, string>();
        this.imports = new Map<string, string>();
    }

}