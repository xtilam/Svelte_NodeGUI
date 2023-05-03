import { WidgetEventTypes } from "@nodegui/nodegui";
import { NSVElement, NativeView } from "src/rng/dom/nativescript-vue-next/runtime/nodes";
import { get_current_component } from "svelte/internal";

type QtSvelteProps<T> = Omit<T, 'on' | 'ref' | '_generic'> & { class?: string }
type FN = { [n in keyof typeof WidgetEventTypes]: (data: any) => any };

type MapFunc<S extends Record<any, (...args: any[]) => any>, THIS = S> = {
    [n in keyof S]: (this: THIS, ...args: Parameters<S[n]>) => ReturnType<S[n]>
};
type QtSvelteEvents<S, Native extends NativeView, Mix = S & FN> = MapFunc<{
    [n in keyof Mix]: (Mix[n] extends (...args: any[]) => any ? Mix[n] : () => void);
}, NSVElement<Native>>


export class SvelteNative<RNG extends NativeView, EL extends NSVElement = NSVElement<RNG>, SPROPS = Parameters<EL['nativeView']['setProps']>[0], SIGNAL = SPROPS extends { _generic?: any } ? SPROPS['_generic'] : void>{
    private _com: any
    _el: any
    _events: QtSvelteEvents<SIGNAL, EL['nativeView']>
    _props: QtSvelteProps<SPROPS>

    constructor() {
        this._com = get_current_component()
        this.onMount(() => {
            const native = this.native as any
            const listCallback = this.callbacks
            for (const evt in listCallback) {
                const callback = listCallback[evt][0]
                native.addEventListener(evt as any, callback.bind(this._el))
            }
        })
    }
    get element() {
        return this._el as EL
    }
    get native() {
        return this.element.nativeView as EL['nativeView']
    }
    get component() {
        return this._com as EL
    }
    onMount(callback: Function) {
        this._com.$$.on_mount.push(callback)
    }
    get callbacks() {
        return this._com.$$.callbacks
    }
}