export { NSVNodeTypes, NSVViewFlags, NSVNode, NSVElement, NSVComment, NSVText, NSVRoot } from "./runtime";
export {
    defaultViewMeta,
    getViewMeta,
    getViewClass,
    normalizeElementName,
    registerElement,
    isKnownView,
    registerNativeElements
} from "./runtime";
export type {
    NSVElementResolver,
    NSVModelDescriptor,
    NSVViewMeta,
    NSVElementDescriptor
} from "./runtime";

export {
    ELEMENT_REF,
    isBoolean,
} from "./runtime";