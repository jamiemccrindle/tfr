# Text Transformer

Searches for a pattern in a file line by line and outputs a replacement string that can contain any captured groups.

## Install

    npm install --global tfr

## Examples

    # prints out all the lines that look like URLs as links
    tfr '^(https?://.*)' -r '<a href="$1">$1</a>' example.txt

    # find all the files that have a parent directory called lib
    find . | tfr '\/lib\/' -r '$_'

    # print how many 500 errors are in the access logs per hour
    cat access.log | trf '^(.*?T\d+).* 500 ' | sort | uniq -c

## Usage

    tfr <pattern> [files..]

    Search and replace strings in a file e.g. tfr '(.*?) (.*?)' test.txt. By default
    matching groups will be printed out separated by tabs

    Positionals:
    pattern  The pattern to match e.g. ^(.*)$                             [string]
    files    The files to search                                          [string]

    Options:
    --version          Show version number                               [boolean]
    --help             Show help                                         [boolean]
    --replacement, -r  The replacement text that can use replacement variables for
                        matched groups i.e. $1 $2 etc.                     [string]
    --delimiter, -d    The output delimiter, defaults to a tab
                                                            [string] [default: "  "]
