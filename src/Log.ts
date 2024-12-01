// Log.ts

import { LogTwo } from "./LogTwo";

export class Log {
	private logTwo = new LogTwo();
	public logIt(str: string) {
		console.log(Date.now(), "LOG:", str);
		this.logTwo.logIt(str);
	}
}
