import {File_Token} from "./file_token";
import {File_Scanner, Main_File_Scanner} from "./scanner"
import path from "path";
import yargs from "yargs";

let argv = yargs(process.argv.slice(2))
    .usage(`Usage: $0 [options]`)

    .describe('m', 'Sets the main file')
    .alias('m', "main_file")
    .default('m', "main.html")

    .describe("o", "resulting file")
    .alias("o", "output_file")
    .default("o","result.html")

    .describe('s', 'path to source directory')
    .alias("s", "src")
    .alias("s", "source")
    .demandOption("s")

    .help('h')
    .alias("h", "help")
    .argv;

console.log(argv.m);


// parse main file
let main_scanner: Main_File_Scanner = new Main_File_Scanner(path.join(String(argv.s), argv.m));
let main_token = main_scanner.scan();
// Fulfill whats needed.

console.log(main_token.get_groups());
console.log(main_token.get_imports());






// put to output file



// let scanner = new File_Scanner(path.join(__dirname,"..", "example_templates", "test2.html"));
// scanner.scan();
// console.log(scanner.file_token);
// let m_scanner = new Main_File_Scanner(path.join(__dirname,"..", "example_templates", "test2.html"));
// m_scanner.scan();
// console.log(m_scanner.file_token);


// Start with a passed in main file





// Look in template directory and make (at least) a list of the templates

    // look at the html
    // take out the style and link tags for style  
    // save those to include in master
    // take out the js and save for later
    // create the graph nodes




// create a template tree and figure out the order to place the templates in a file

// Start the injection, one file at a time

