# Text Transformer

 Searches for a pattern in a file line by line and outputs a replacement string that can contain any captured
 groups. 

## Install

    npm install --global tfr

## Examples

    # prints out all the lines that look like URLs as links
    tfr '^(https?://.*)' '<a href="$1">$1</a>' example.txt

    # find all the files that have a parent directory called lib
    find . | tfr "\/lib\/" '$_'

    # print how many 500 errors are in the access logs per hour
    cat access.log | trf '^(.*?T\d+).* 500 ' '$1' | sort | uniq -c

## Usage

    tfr <pattern> <replacement> [files..]

    Seach and replace strings in a file e.g. tfr '(.*?) (.*?)' '$1 $2' test.txt

    Positionals:
    pattern      The pattern to match e.g. ^(.*)$                         [string]
    replacement  The replacement text that can use replacement variables for
                matched groups i.e. $_ $1 $2 etc.                         [string]
    files        The files to search                                      [string]

    Options:
    --version  Show version number                                       [boolean]
    --help     Show help                                                 [boolean]
