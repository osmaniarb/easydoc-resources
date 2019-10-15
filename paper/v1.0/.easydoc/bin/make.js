/**
 * make script for markdown to pdf via pandoc
 *
 * @author arberosmani
 * @since  13.10.2019
 */

const fs = require('fs');
const path = require('path');
const c = require('./config.json');
const helper = require('./lib/helper');

// Setup some vars
let basePath = __dirname + '/' + c.basePath;
let outputDir = basePath + c.outputDir;

// Create output dir
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Remove file in output dir (if exists)
helper.deleteFolderContentRecursive(outputDir + '/*', _ => true);

// prepare pandoc command
let input = helper.escapeShell(c.inputFile);
let outputFile = c.outputFile ? `${outputDir}/${c.outputFile}` : `${outputDir}/output.pdf`;
let output = `-o ${helper.escapeShell(outputFile)}`;
let bibFile = c.bibFile ? basePath + c.bibFile : '';
let cslFile = c.cslFile ? basePath + c.cslFile : '';
let bibliography = '';
let csl = '';
let filters = '';

if (c.bibliography) {
  bibliography = `--bibliography=${helper.escapeShell(bibFile)}`;
  csl = `--csl=${helper.escapeShell(cslFile)}`;
}

if (c.filters) {
  c.filters.forEach(filter => {
    filters += `--filter=${helper.escapeShell(filter)} `
  })
}

let command = `pandoc ${bibliography} ${csl} ${filters} ${output} ${input}`;

// Execute pandoc command
helper.exec(command)
