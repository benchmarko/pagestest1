// Log.ts
import { LogTwo } from "./LogTwo";
export class Log {
    constructor() {
        this.logTwo = new LogTwo();
    }
    logIt(str) {
        console.log(Date.now(), "LOG:", str);
        this.logTwo.logIt(str);
    }
}
//# sourceMappingURL=Log.js.map