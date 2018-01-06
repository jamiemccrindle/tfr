#!/usr/bin/env node

const LineByLineReader = require('line-by-line');
const fs = require('fs');

const regexPattern = /^\/(.*?)\/([^\/]*)$/;

const processFile = (pattern, file) => {
    return new Promise((resolve, reject) => {
        const lr = new LineByLineReader(file);

        lr.on('error', function (err) {
            console.error(err);
        });

        lr.on('line', function (line) {
            const result = pattern.exec(line);
            if (result) {
                let output = argv.replacement;
                for (let i = 1; i < result.length; i++) {
                    output = output.replace('$' + i, result[i]);
                }
                output = output.replace('$_', line);
                console.log(output);
            }
        });

        lr.on('end', function () {
            resolve();
        });
    });
}

const promiseSerial = funcs =>
    funcs.reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]))

var argv = require('yargs')
    .command('$0 <pattern> <replacement> [files..]', `Seach and replace strings in a file e.g. tfr '(.*?) (.*?)' '$1 $2' test.txt`,
    (yargs) => {
        yargs
            .positional('pattern', {
                describe: 'The pattern to match e.g. ^(.*)$',
                type: 'string'
            })
            .positional('replacement', {
                describe: 'The replacement text that can use replacement variables for matched groups i.e. $1 $2 etc.',
                type: 'string'
            })
            .positional('files', {
                describe: 'The files to search',
                type: 'string'
            })
            .showHelpOnFail(false, 'Specify --help for available options')
    },
    (argv) => {
        const pattern = new RegExp(argv.pattern);

        if (argv.files.length === 0) {
            processFile(pattern, process.stdin)
                .catch(err => console.error(err.stack));
        } else {
            promiseSerial(
                argv.files
                    .filter(file => !fs.lstatSync(file).isDirectory())
                    .map(file => () => processFile(pattern, file)))
                .catch(err => console.error(err.stack));
        }

    })
    .help('help')
    .argv;
