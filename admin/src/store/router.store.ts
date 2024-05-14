import { makeAutoObservable } from "mobx"

class RouterStore {
    currentPath:string
    constructor() {
        this.currentPath = '/'
        makeAutoObservable(this)
    }

    setCurrentPath(path:string) {
        this.currentPath = path
    }
}

export default RouterStore