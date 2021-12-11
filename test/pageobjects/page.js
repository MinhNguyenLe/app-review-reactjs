export default class Page {
    open(path) {
        return browser.url(`http://localhost:1000/${path}`)
    }
}
