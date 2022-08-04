import { randomInt } from "crypto";

export type section = {

}

export type ConfigFile = {
    "year": Number,
    "teamNumber": Number,
    "password": string,
    "version": Number,
    "scouting": {
        [method: string]: {
            [page: string]: {
                "footer": string,
                "sections": Array<section>
            }
        }
    },
}

export function createConfigFile(teamNumber: Number): ConfigFile {
    const possiblePasswords = ["nami", "sushi", "peepo", "daimler", "unagi", "nori", "sparkie"];
    const ret: ConfigFile = {
        "year": (new Date()).getFullYear(),
        "teamNumber": teamNumber,
        "password": possiblePasswords[Math.floor(Math.random() * (possiblePasswords.length-1))],
        "version": 0,
        "scouting": {

        },
    };

    return ret;
}