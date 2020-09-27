
/*
    Some thoughts about imports.
    Imports need to be accessed by file name. So we can say what imports do you have?
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
    file_name: string,
    group_name: string
    line_number: number,
};

export class File_Token {

    name: string;
    groups: Map<string,string[]>; // Group name to array of strings
    // import name to 
    imports: Map<string, an_import[]>; // file id import -> an_import object.

    constructor(name_:string){
        this.name = name_;
        this.groups = new Map<string, string[]>();
        this.imports = new Map<string, an_import[]>();
    }


    add_group(name: string, lines: string[]){
        this.groups.set(name, lines);
    }

    add_import(file_name: string, group_name: string, line_number: number)
    {
        if(!this.imports.has(file_name))
        {
            this.imports.set(file_name, []);
        }
        this.imports.get(file_name)?.push({file_name:file_name, line_number:line_number, group_name:group_name});
    }

    get_groups(){
        return this.groups;
    }
    
    get_imports(){
        return this.imports;
    }


}