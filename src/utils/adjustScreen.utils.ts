export class AdjustScreen {

    public static getWindowScroll():void {
        return window.scroll({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }
}
