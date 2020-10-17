import {File_Token, an_import} from "./file_token";
import {File_Scanner, Main_File_Scanner} from "./scanner"
import path from "path";
import yargs from "yargs";

let argv = yargs(process.argv.slice(2))
    .usage(`Usage: $0 [options]`)

    .describe('m', 'Sets the main file')
    .alias('m', "main_file")
    .default('m', "main")

    .describe("o", "resulting file")
    .alias("o", "output_file")
    .default("o","result")

    .describe('s', 'path to source directory')
    .alias("s", "src")
    .alias("s", "source")
    .demandOption("s")

    .describe('e', 'specifies the file extension used')
    .alias('e', 'extension')
    .default("e", "html")

    .help('h')
    .alias("h", "help")
    .argv;

console.log(argv.m);


// parse main file
let main_scanner: Main_File_Scanner = new Main_File_Scanner(path.join(String(argv.s), `${argv.m}.${argv.e}`));
let main_token = main_scanner.scan();
// Fulfill whats needed.

let token_cache: Map<string, File_Token> = new Map<string, File_Token>()    

function fulfill(token: File_Token): File_Token
{
    if(token.is_fulfiled())
        return token;
    
    let import_tup = token.get_next_import();
    while(!token.is_fulfiled())
    {
        let imports: an_import[] = import_tup[1];
        let t_name: string = import_tup[0];
        let t_fulfilled: File_Token;
        if(token_cache.has(t_name))
            t_fulfilled = token_cache.get(t_name);
        else
        {
            // Create new token
            let file_scanner: File_Scanner = new File_Scanner(path.join(String(argv.s), `${t_name}.${argv.e}`));
            t_fulfilled = fulfill(file_scanner.scan());
        }            

        for(let Import of imports)
        {
            token.fulfill_import(Import, t_fulfilled.get_group(Import.group_import_name));
        }

        import_tup = token.get_next_import();
    }

    token_cache.set(token.name, token); 
    return token;
}

console.log(main_token.get_groups());
console.log(main_token.get_imports());

fulfill(main_token);

console.log(main_token.get_group("main"));
//TODO: at the moment main is filled with array of strings and other arrays. We need to take this 
// complex object and turn in into a single string that will write out to a file.



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

