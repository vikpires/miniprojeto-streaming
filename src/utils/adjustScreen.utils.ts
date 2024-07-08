export class AdjustScreen {

    static getWindowScroll() {
        return window.scroll({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }
}
