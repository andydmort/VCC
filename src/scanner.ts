import * as fs from "fs";
import { File_Token } from "./file_token";

enum Scanner_State {
    not_in_group = 0,
    in_group
}

export class File_Scanner {
    /**
     * Specifies the file name that the scanner is looking at.
     */
    file_name: string;
    /**
     * Specifies all of the lines of text in the file
     */
    file_lines: Array<string>;
    /**
     * Specifies the group name of the group that is currently being scanned. 
     * This value will be empty if nothing is being scanned.
     */
    current_group_name : string;
    
    current_group_lines: string[];
    /**
     * Specifies the current state of the scanner
     */
    state: Scanner_State;
    /**
     * Specifies the next line number to be read.
     * TODO: see if this is used.
     */
    line_num: number;
    /**
     * Specifies the current file token being created
     */
    file_token: File_Token;

    /**
     * This class will scan a file and return File_Token 
     * @param file_name Specifies the name of the file to be Scanned
     */
    constructor(file_name: string){
        this.line_num = 0;
        this.state = Scanner_State.not_in_group;
        this.current_group_name = "";
        this.current_group_lines = [];
        this.file_name = file_name;

        //Remove the last file_ext of the file_name for the token name
        let tmp_arr = file_name.split("\\");
        let tmp_arr2 = tmp_arr[tmp_arr.length -1].split("/");
        let the_file_name = tmp_arr2[tmp_arr2.length -1];
        let file_n_arr = the_file_name.split(".");
        let pop = file_n_arr.pop(); // Remove the last item
        let new_token_name = file_n_arr.reduce((cum, val)=>{
            if(cum == "") return val;
            else return cum+"."+val;
        });
        this.file_token = new File_Token(new_token_name);

        // read in the file
        let file_str = fs.readFileSync(file_name, "utf-8"); 
        // Split up the file lines
        this.file_lines = file_str.split(/\r\n|\n|\r/);
    }

    scan(){
        this.file_lines.forEach((line)=>{
            this.scan_line(line);
        });
        return this.file_token;
    }

    /*
     \#\s*begin\s+(\S+)\s*\#  --> will catch a begin flag
     \#\s*end\s+(\S+)\s*\#  --> will catch an end flag
     \#\s*import\s+(\S+)\s+(\S+)\s*\#  --> will catch an import statement
    */ 
    scan_line(line_str: string){
        if(this.state == Scanner_State.not_in_group)
        {
            // See if this line is a begin group match
            let begin_group_matches = line_str.match(/\#\s*begin\s+(\S+)\s*\#/)
            if(begin_group_matches)
            {
                this.state = Scanner_State.in_group;    
                this.current_group_name = begin_group_matches[1]; 
            }
        }
        else if(this.state == Scanner_State.in_group)
        {
            // TODO: finish this section
            // see if it is an import
            let import_matches = line_str.match(/\#\s*import\s+(\S+)\s+(\S+)\s*\#/);
            if(import_matches)
            {
                // collect as import
                let import_name = import_matches[1];
                let import_id_to_give = import_matches[2];
                this.current_group_lines.push(line_str);
                this.file_token.add_import(
                    import_name, 
                    this.current_group_name, 
                    this.current_group_lines.length-1,
                    import_id_to_give 
                    );
            }
            else
            {
                // see if it is an ending group of text
                let ending_matches = line_str.match(/\#\s*end\s+(\S+)\s*\#/);
                if(ending_matches)
                {
                    // finish the group
                    this.file_token.add_group(this.current_group_name, this.current_group_lines);
                    // Clear the local group info
                    this.current_group_name = "";
                    this.current_group_lines = [];
                    this.state = Scanner_State.not_in_group;
                }
                else
                {
                    //add this line string to the group.
                    this.current_group_lines.push(line_str);
                }
            }
        }
    }
}





