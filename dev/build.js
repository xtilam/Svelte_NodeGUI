const { spawn, execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

main()

async function main() {
    const distDir = path.join(__dirname, '../dist')
    const indexPath = path.join(distDir, 'index.js')
    const bytenodeJSPath = path.join(__dirname, '../node_modules/bytenode/lib/index.js')

    await spawnExec('npm.cmd', 'run bundle').promise
    await spawnExec('npx.cmd', 'qode dev/build-jsc.js').promise
    fs.rmSync(path.join(distDir, 'nodegui-lib.js'))
    fs.rmSync(path.join(distDir, 'main.js'))
    fs.writeFileSync(indexPath, [
        execSync(`npx minify ${bytenodeJSPath}`).toString().trim(),
        `global.require = require`,
        `runBytecodeFile(require('path').join(__dirname, 'main.jsc'))`,
    ].join(';'))
    await spawnExec('npx.cmd', 'nodegui-packer --init SNGApp').promise
    await spawnExec('npx.cmd', 'nodegui-packer --pack ./dist').promise

    // await spawnExec('npx.cmd', 'qode dist/index.js').promise
}


function spawnExec(program, args, option) {
    if (typeof args === 'string') args = args.split(' ')
    const child = spawn(program, args, option)
    child.stdout.on('data', (d) => {
        process.stdout.write(d.toString())
    })
    child.stderr.on('data', (d) => {
        process.stderr.write(d.toString())
    })

    const promise = new Promise((resolve, reject) => {
        child.on('exit', (code) => {
            if (code === 0) resolve()
            else reject()
        })
    })

    return { child, promise }
}