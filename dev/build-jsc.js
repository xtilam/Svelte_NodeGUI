const path = require('path')
const fs = require('fs')
const bytenode = require('bytenode')

app()

async function app() {
    const lib = path.join(__dirname, '../dist/nodegui-lib.js')
    const main = path.join(__dirname, '../dist/main.js')
    const mainBytenodePath = path.join(__dirname, '../dist/main.jsc')
    const codeCompile = bytenode.compileCode(fs.readFileSync(lib, 'utf-8') + ';' +fs.readFileSync(main, 'utf-8'))
    fs.writeFileSync(mainBytenodePath, codeCompile)
    console.log('compile done')
    process.exit(0)
}
