export type component = {
    "name": string,
    "type": string,
    "component": string,
    "required": boolean,
    "timestamp": boolean,
    "isCommonValue": boolean,
    "setCommonValue": boolean,
    "values": Array<string>
}

export type section = {
    "properties": {
        "title": string,
        "color": string,
        "rows": number,
        "textColor": string,
        "darkColor": string,
        "darkTextColor": string,
        "componentsInRow": Array<number>
    },
    "components": Array<component>
}

export type ConfigFile = {
    "year": number,
    "teamNumber": number,
    "password": string,
    "version": number,
    "scouting": {
        [method: string]: {
            [page: string]: {
                "footer": string,
                "sections": Array<section>
            }
        }
    },
}

export function createConfigFile(teamNumber: number): ConfigFile {
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

export function createEmptyComponent(): component {
    return {
        "name" : "",
        "component" : "",
        "values" : [],
        "isCommonValue" : false,
        "required" : false,
        "type" : "",
        "timestamp" : false,
        "setCommonValue" : false,
    }
}