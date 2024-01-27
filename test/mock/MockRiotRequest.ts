// import { IAccountDTO } from "../../src/entity/Account-v1/AccountDTO";
// import { random } from "faker";
// faker.random.uuid();

import { IAccountDTO } from "@bedy90/riotentity";

export abstract class MockRiotRequest {

    static getRiotAccount(): IAccountDTO {
        let accountInfo: IAccountDTO = {
            puuid: "qHn0uNkpA1T-NqQ0zHTEqNh1BhH5SAsGWwkZsacbeKBqSdkUEaYOcYNjDomm60vMrLWHu4ulYg1C5Q",
            gameName: "Bedy Tester",
            tagLine: "#Test"
        };

        return accountInfo;
    }

    static async getAsyncRiotAccount(): Promise<IAccountDTO> {
        let accountInfo: IAccountDTO = {
            puuid: "qHn0uNkpA1T-NqQ0zHTEqNh1BhH5SAsGWwkZsacbeKBqSdkUEaYOcYNjDomm60vMrLWHu4ulYg1C5Q",
            gameName: "Bedy Tester",
            tagLine: "#Test"
        };

        return accountInfo;
    }

}