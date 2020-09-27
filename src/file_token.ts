
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
    file_import_name: string, // File name that has the code to import
    group_import_name: string // groupt name that has the code to import
    group_name: string, // The group that contains the import statement
    line_number: number, // The line number of the import statement in the group
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

    add_import(import_file_name:string, import_group_name: string, group_name: string, line_number: number)
    {
        if(!this.imports.has(import_file_name))
        {
            this.imports.set(import_file_name, []);
        }
        this.imports.get(import_file_name)?.push(
            {
                file_import_name:import_file_name, 
                group_import_name: import_group_name,
                line_number:line_number, 
                group_name:group_name
            });
    }

    get_groups(){
        return this.groups;
    }
    
    get_imports(){
        return this.imports;
    }


}