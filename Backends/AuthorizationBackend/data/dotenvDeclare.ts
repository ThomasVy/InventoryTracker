import * as dotenv from "dotenv";
dotenv.config();

declare var process : {
    env: {
        DATABASE_URI: string,
        TOKEN_SECRET: string,
        REFRESH_TOKEN_SECRET:string,
    }
}

export default process;