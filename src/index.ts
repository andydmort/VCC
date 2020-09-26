import {File_Token} from "./file_token";
import {File_Scanner} from "./scanner"
import path from "path";

let scanner = new File_Scanner(path.join(__dirname,"..", "example_templates", "test2.html"));
scanner.scan();
console.log(scanner.file_token);

// Look in template directory and make (at least) a list of the templates

    // look at the html
    // take out the style and link tags for style  
    // save those to include in master
    // take out the js and save for later
    // create the graph nodes




// create a template tree and figure out the order to place the templates in a file

// Start the injection, one file at a time

