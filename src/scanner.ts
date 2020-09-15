import * as fs from "fs";
import { File_Token } from "./file_token";

enum Scanner_State {
    not_in_group = 0,
    in_group
}

class Scanner {
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
    file_token?: File_Token;

    /**
     * This class will scan a file and return File_Token 
     * @param file_name Specifies the name of the file to be Scanned
     */
    constructor(file_name: string){
        this.line_num = 0;
        this.state = Scanner_State.not_in_group;
        this.current_group_name = "";
        this.file_name = file_name;

        // read in the file
        let file_str = fs.readFileSync(file_name, "utf-8"); 
        // Split up the file lines
        this.file_lines = file_str.split(/\r\n|\n|\r/);
    }

    scan(){
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
            // see if it is an ending group of text
        }
    }

}
