
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
export interface an_import
{
    file_import_name: string, // File name that has the code to import
    group_import_name: string // groupt name that has the code to import
    group_name: string, // The group that contains the import statement
    line_number: number, // The line number of the import statement in the group
    fulfilled: boolean
};

export class File_Token {

    name: string; 
    groups: Map<string,any[]>; // Group name to array of strings
    // import name to 
    imports: Map<string, an_import[]>; // import_file_name -> array of an_imports
    /**
     * Specifies if the File_Token has been completed fulfilled.
     */
    fulfilled: boolean;

    constructor(name_:string){
        this.name = name_;
        this.groups = new Map<string, string[]>();
        this.imports = new Map<string, an_import[]>();
        this.fulfilled = true;
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
                group_name:group_name,
                fulfilled: false
            });
            this.fulfilled = false;
    }

    get_groups(){
        return this.groups;
    }
    
    get_imports(){
        return this.imports;
    }

    /**
     * Gets a group that is in this file. 
     * @param group_name Specifies the group of strings to collect.
     */
    get_group(group_name: string): string[]
    {
        return this.groups.get(group_name);
    }

    /**
     * Get an import to be fulfilled
     */
    get_next_import(): [string, an_import[]] | undefined{
        if(this.imports.size > 0)
        {
            let key =Array.from(this.imports.keys())[0]; 
            return [key, this.imports.get(key)];
        }
        else
            return undefined;
    }

    /**
     * Looks at all the import statements and marks this token as fulfilled if all imports
     * were fulfilled.
     */
    check_if_fulfilled(){
        for(let import_tup of this.imports)
        {
            for(let thang of this.imports.get(import_tup[0]))
            {
                if(!thang.fulfilled)
                    return;
            }
        }
        this.fulfilled = true;
    }

    /**
     * Fulfills an import.
     * @param the_import Specifies the import to be fulfilled.
     * @param lines Specifes the lines that will be place directly under import statement. 
     * @return True if something was fulfilled.
     */
    fulfill_import(the_import: an_import, lines: string[]): boolean
    {
        // Replace the lines just under the line number
        let line_number: number = the_import.line_number;
        let group: string = the_import.group_name;

        
        // Fulfil this in the imports
        for(let thang of this.imports.get(the_import.file_import_name))
        {
            if(thang.group_import_name == the_import.group_import_name &&
                thang.group_name == the_import.group_name &&
                thang.line_number == the_import.line_number)
            {
                // Fulfill this in the group
                let tmp = this.groups.get(group)[line_number];
                let tmp_lines = lines;
                tmp_lines.splice(0,0,tmp);
                tmp_lines.push(tmp); 
                this.groups.get(group).splice(line_number, 1, lines);
                thang.fulfilled = true;            
                this.check_if_fulfilled();
                return true;
            }
        }

        return false;
    }

    /**
     * Gets if the token is fulfilled
     */
    is_fulfiled(): boolean{
        return this.fulfilled;
    }
}