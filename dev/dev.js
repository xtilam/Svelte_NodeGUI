const path = require("path")

const nodemon = require('nodemon')
const { spawn } = require("child_process")
const { existsSync, rmSync, readFileSync } = require("fs")

main()

async function main() {
    const distDir = path.join(__dirname, '../dist')
    const nodeguiLib = path.join(__dirname, '../dist/nodegui-lib.js')
    const mainJSPath = path.join(__dirname, '../dist/main.js')
    const cssPath = path.join(__dirname, '../dist/styles.css')

    const buildProcess = spawn('npm.cmd', ['run', 'bundle-dev'])
    let countCheckCSS = 0
    buildProcess.stdout.on('data', v => process.stdout.write(v))
    buildProcess.stderr.on('data', v => process.stdout.write(v))

    // if (existsSync(nodeguiLib)) rmSync(nodeguiLib)
    if (existsSync(mainJSPath)) rmSync(mainJSPath)

    await new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!existsSync(nodeguiLib)) return
            clearInterval(interval)
            setTimeout(resolve, 500)
        }, 500)
    })

    require(nodeguiLib)

    let isStart = false
    let oldJSContent = ''

    const mon = nodemon({
        exec: ' ',
        watch: path.dirname(mainJSPath),
        ext: '.css,.js'
    })

    mon.on('restart', runBuild)

    function runBuild(files) {
        if (isStart) return console.log('delay compile')
        console.log('reload', `${files}`)

        let isReloadCSS = false
        let isReloadJS = false

        for (const file of files) {
            const ext = path.extname(file)
            switch (ext) {
                case '.css': {
                    isReloadCSS = true
                    break
                }
                case '.js': {
                    isReloadJS = true
                }
                default: continue
            }
        }

        if (isReloadCSS && !isReloadJS) {
            const currentCountCheckCSS = ++countCheckCSS
            oldJSContent = readFileSync(mainJSPath, 'utf-8')

            setTimeout(() => {
                if (currentCountCheckCSS !== countCheckCSS) return
                console.log('-------------Reload_CSS--------------')
                _node_gui.QApplication.instance().setStyleSheet(`${readFileSync(cssPath)}`)
                oldJSContent = ''
            }, 100)

            return
        }
        if (oldJSContent && oldJSContent === readFileSync(mainJSPath, 'utf-8')) return console.log('skip reload js')
        isStart = true

        setTimeout(() => {
            if (require.cache[mainJSPath]) delete require.cache[mainJSPath]
            console.log('-------------Reload_App--------------')
            try {
                require(mainJSPath)
            } catch (error) {
                console.log(error)
            }
            isStart = false
        }, 200)
    }
}