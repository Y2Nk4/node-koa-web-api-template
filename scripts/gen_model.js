let fs = require('fs')
let { program } = require('commander')
let path = require('path')
let stringTemplate = require('string-template')

program.version('0.0.1')
    .option('-m, --model <string>', 'Name of the model you want to create')
    .option('-t, --table <string>', 'Name of the table you want to bind your model to')

program.parse(process.argv)

if (!program.model) return console.error('Please define the name of the model by -m or --model\nHelps by gen_model -h')
if (!program.table) return console.error('Please define the name of the table by -t or --table\nHelps by gen_model -h')

console.log('Generating Model:', program.model, ' bind Table:', program.table)
const modelTemplate = fs.readFileSync(path.resolve(__dirname, './templates/gen_model.template'), 'utf8')
const modelText = stringTemplate(modelTemplate, {
    model: program.model,
    table: program.table
})

fs.writeFileSync(path.resolve(__dirname, '../server/models/', `${program.model}.js`), modelText)

console.log(`Generated Model: ${program.model}`)
