
/*
    Some thoughts about imports.
    Imports need to be accessed by import name. So we can say what imports do you have?
    The name may be used multiple times. 
    The containing information should be group and line number 
*/

/**
 * group_name Specifies the group and import belongs to.
 * line_number Specifies the line number in the group to be replaced
 * new_id Specifies a new id to be give to the top element of the html imported. // TODO: figure out this this is needed.
 */
interface an_import
{
    group_name: string,
    line_number: number,
    new_id: string|undefined
};

export class File_Token {

    name: string;
    groups: Map<string,string[]>; // Group name to array of strings
    // import name to 
    imports: Map<string, an_import[]>; // This might be subject to change, we must include the import name, the line number, and the group it is in. Maybe a more complex object.

    constructor(name_:string){
        this.name = name_;
        this.groups = new Map<string, string[]>();
        this.imports = new Map<string, an_import[]>();
    }


    add_group(name: string, lines: string[]){
        this.groups.set(name, lines);
    }

    add_import(import_name: string, group_name: string, line_number: number, new_id:string|undefined = undefined)
    {
        if(!this.imports.has(import_name))
        {
            this.imports.set(import_name, []);
        }
        this.imports.get(import_name)?.push({group_name:group_name, line_number:line_number, new_id:new_id});
    }
}