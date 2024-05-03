import { randomInt } from "crypto";

function nextRandom(length: number): string {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = upper.toLowerCase();
    let digits = "0123456789";
    let alphanum = upper + digits;

    let buf = [];

    for (let idx = 0; idx < length; idx++) {
        buf[idx] = alphanum[randomInt(36)];
    }

    return buf.reduce((x, y) => x.concat(y));
}

export function nextToken(): string {
    let prefix = (Date.now()).toString(16).toUpperCase();
    return `TX-${prefix}-${nextRandom(24-prefix.length)}`;
}