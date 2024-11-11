import { makeAutoObservable } from "mobx"

class Timer {
    secondPassed  = 0;

    constructor() {
        makeAutoObservable(this)
    }

    increase() {
        this.secondPassed++;
    }

    reset() {
        this.secondPassed = 0;
    }

    get secondsPassed() {
        return this.secondPassed;
    }

}

export const timer = new Timer();