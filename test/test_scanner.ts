import {File_Scanner} from "../src/scanner";
import Path from "path";
import Assert from "assert";


describe("Scanner", ()=>{
    it( "Should be able to scan in a simple file", ()=>{
        let fs = new File_Scanner(Path.join(__dirname, "test_file.html"));
        fs.scan();
        let ft = fs.scan();

        Assert.strictEqual("test_file", ft.name);

        // Check the scanned groups
        Assert.strictEqual(true, ft.get_groups().has("html"));
        Assert.strictEqual(true, ft.get_groups().has("js"));
        
        // Check the ammount of scanned values in each group
        Assert.strictEqual(2, ft.get_groups().get("html")?.length);
        Assert.strictEqual(1, ft.get_groups().get("js")?.length);

        // Check the imports
        Assert.strictEqual(true, ft.get_imports().has("test2")); 
        // Check the import line number
        Assert.strictEqual(1, ft.get_imports().get("test2")[0].line_number);
        // Check the group name
        Assert.strictEqual("html", ft.get_imports().get("test2")[0].group_name)
        // check the import unique_id_to_add
        Assert.strictEqual("this_is_a_unique_id", ft.get_imports().get("test2")[0].new_id);
    });
});
