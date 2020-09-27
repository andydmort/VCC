import { File_Scanner } from "../scanner";
import { Main_File_Scanner } from "../scanner";
import Path from "path";
import Assert from "assert";


describe("Scanner", () => {
    it("Should be able to scan in a template file", () => {
        let fs = new File_Scanner(Path.join(__dirname, "test_file.html"));
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
        // Check the group import name
        Assert.strictEqual("html", ft.get_imports().get("test2")[0].group_import_name);
        // check the import file_name
        Assert.strictEqual("test2", ft.get_imports().get("test2")[0].file_import_name);
    });

    it("Scan a main file", () => {
        let fs = new Main_File_Scanner(Path.join(__dirname, "test_file.html"));
        let ft = fs.scan();

        Assert.strictEqual("test_file", ft.name);

        // Check the groups. There should only be a main.
        Assert.strictEqual(true, ft.get_groups().has("main"));
        Assert.strictEqual(false, ft.get_groups().has("js"));
        Assert.strictEqual(1, ft.get_groups().size);

        // Check the imports
        Assert.strictEqual(true, ft.get_imports().has("test2"));
        // Check the import line number
        Assert.strictEqual(2, ft.get_imports().get("test2")[0].line_number);
        // Check the group name
        Assert.strictEqual("main", ft.get_imports().get("test2")[0].group_name);
        // check the import file_name
        Assert.strictEqual("test2", ft.get_imports().get("test2")[0].file_import_name);
        // Check the import group name
        Assert.strictEqual("html", ft.get_imports().get("test2")[0].group_import_name);
    });

});
