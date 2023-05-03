import { QApplication, QIcon } from "@nodegui/nodegui";
import { readFileSync } from "fs";
import path from "path";
import { NSVElement, RNWindow, initializeDom } from "../rng";
import Main from "./views/Main.svelte";


if (!global.document) initializeDom()
QApplication.instance().setStyleSheet(`${readFileSync(path.resolve('dist/styles.css'))}`)
let win: NSVElement<RNWindow>


if (global.__win__) {
    __main__.$destroy()
    initializeDom()
    let localWin = document.createElement('window') as any as NSVElement<RNWindow>
    localWin.nativeView.delete(); 
    ; (localWin as any)._nativeView = __win__.nativeView
    win = localWin
    __win__ = localWin
} else {
    win = document.createElement('window') as any
    global.__win__ = win
}

if (!win.nativeView.isVisible()) {
    win.nativeView.show()
    win.nativeView.move(0, 0)
} 

win.nativeView.resize(400, 400)
win.nativeView.setWindowTitle('Hello NodeGUI')
win.nativeView.setWindowIcon(new QIcon(path.join(__dirname, './fox.ico')))

let main = new (Main as any)({ target: win })
global.__main__ = main

