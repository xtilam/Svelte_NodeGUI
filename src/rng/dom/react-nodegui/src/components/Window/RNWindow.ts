import {
  QMainWindow,
  QWidget as NodeWidget,
  type QMainWindowSignals,
  QMenuBar,
} from "@nodegui/nodegui";
import { setViewProps, type ViewProps } from "../View/RNView";
import type { RNWidget } from "../config";

export interface WindowProps extends ViewProps<QMainWindowSignals> {
  menuBar?: QMenuBar;
}

const setWindowProps = (
  window: RNWindow,
  newProps: WindowProps,
  oldProps: WindowProps
) => {
  const setter: WindowProps = {
    set menuBar(menubar: QMenuBar) {
      window.setMenuBar(menubar);
      console.log("menubar was set");
    },
  };
  Object.assign(setter, newProps);
  setViewProps(window, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNWindow extends QMainWindow implements RNWidget {
  setProps(newProps: WindowProps, oldProps: WindowProps): void {
    setWindowProps(this, newProps, oldProps);
  }
  removeChild(child: NodeWidget<any>) {
    const removedChild = this.centralWidget();
    removedChild && removedChild.close();
    if (child !== removedChild) child.close()
  }
  appendInitialChild(child: NodeWidget<any> | QMenuBar): void {
    if (child instanceof QMenuBar) {
      if (!this.menuBar()) {
        this.setMenuBar(child);
      } else {
        console.warn("MainWindow can't have more than one menubar.");
      }
      return;
    }
    if (!this.centralWidget()) {
      this.setCentralWidget(child);
    } else {
      if (child === this.centralWidget()) return
      this.centralWidget().delete()
      this.setCentralWidget(child);
      console.warn("MainWindow can't have more than one child node");
    } 
  }
  appendChild(child: NodeWidget<any>): void {
    this.appendInitialChild(child);
  }
  insertBefore(child: NodeWidget<any>, beforeChild: NodeWidget<any>): void {
    this.appendInitialChild(child);
  }
  static tagName = "mainwindow";
}