# VCC View Controller Compiler
This is a compiler that will take template files and create html and js files. Similar to View.js but more of an open ended framework. The template files will consists of just html and js. These template files will be compiled together into a single html file. 




## Grouping

Groups mark code that can be imported into another file. 

Anything can belong in a group. A group begins in a comment that contains the begin flag. 

```
# begin <group name> #
```

It ends when a comment expressed the end flag.

```
# end <group name> #
```

## Importing

Any group can be imported into another template.

Importing is done by using the import flag.

```
# import <file_name> <group_name> #
```

file_name - Specifies the name of the file the group is in.
group_name - Specifies the group of code that should be imported.

The import statement will be replaced by the group code . 



TODO ITEMS:
[] In index.tx create a fuction to combine the complex array object into output string or file.
[] Create tests for File_Tokens get_next_import, check_if_fulfiled, is_fulfiled, and fulfil_import functions.