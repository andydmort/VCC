import {File_Token, an_import} from "./file_token";
import {File_Scanner, Main_File_Scanner} from "./scanner"
import path from "path";
import yargs from "yargs";
import { type, EOL } from "os";
import {writeFile} from "fs";

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

let token_cache: Map<string, File_Token> = new Map<string, File_Token>();    

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
fulfill(main_token);

function consolidate(group: any[]): string
{
    let rtn: string = "";
    for( let s of group)
    {
        if(typeof(s) == "string")
        {
            rtn = rtn.concat(s);
        }
        else if(typeof(s) == "object")
        {
            rtn = rtn.concat(consolidate(s));
        }
        rtn = rtn.concat(EOL);
    }
    return rtn;
}

let string_to_write: string =consolidate(main_token.get_group("main")); 
console.log(string_to_write);

writeFile(String(argv.o), string_to_write, (err)=>{
    if(err)
        console.error(err);
    console.log("DONE");
});

// put to output file


