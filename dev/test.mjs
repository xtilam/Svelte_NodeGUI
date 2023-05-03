
import { Direction, QBoxLayout, QMainWindow, QPushButton, QSizePolicyPolicy, QWidget } from "@nodegui/nodegui"

const win = new QMainWindow()
const centralWidget = new QWidget()
const layout = new QBoxLayout(Direction.TopToBottom)
const button = new QPushButton()
button.setText('this is button')

button.setSizePolicy(QSizePolicyPolicy.Minimum, QSizePolicyPolicy.Minimum)


win.move(0, 0)
win.setWindowTitle('this is window')
win.resize(500, 500)
win.show()

win.setCentralWidget(centralWidget)
centralWidget.setLayout(layout)
layout.addWidget(button)