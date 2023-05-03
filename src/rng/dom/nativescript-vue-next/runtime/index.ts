// @ts-nocheck
export { NSVNodeTypes, NSVViewFlags, NSVNode, NSVElement, NSVComment, NSVText, NSVRoot }  from "./nodes";
export {
    defaultViewMeta,
    getViewMeta,
    getViewClass,
    normalizeElementName,
    registerElement,
    isKnownView,
    registerNativeElements
} from "./registry";
export type {
    NSVElementResolver,
    NSVModelDescriptor,
    NSVViewMeta,
    NSVElementDescriptor
} from "./registry";

export {
    ELEMENT_REF,
    // isAndroidKey,
    // isIOSKey,
    isBoolean,
} from "./runtimeHelpers";