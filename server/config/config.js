import Joi from "joi";
import fs from "fs";

if (process.env.NODE_ENV) {
    if (process.env.NODE_ENV === 'staging') {
        var envConfig = require("dotenv").parse(fs.readFileSync('.env.staging'));
        for (const k in envConfig) {
            process.env[k] = envConfig[k];
        }
    } else if (process.env.NODE_ENV === 'production') {
        var envConfig = require("dotenv").parse(fs.readFileSync('.env.production'));
        for (const k in envConfig) {
            process.env[k] = envConfig[k];
        }
    } else {
        // require and configure dotenv, will load vars in .env in PROCESS.ENV
        require("dotenv").config();
    }
} else {
    // require and configure dotenv, will load vars in .env in PROCESS.ENV
    require("dotenv").config();
}

//define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(["development", "production", "staging", "local"])
        .default("development"),
    PORT: Joi.number().default(4003),
    JWT_SECRET: Joi.string()
        .default("TORUM!@!#$$%@%$")
        .description("JWT Secret required to sign"),
    JWT_TOKEN_EXPIRE: Joi.string()
        .default("1d")
        .description("JWT Token Expired in Days"),
    MONGO_DB_URI: Joi.string()
        .default("")
        .description("Mongo DB URI"),
    COMMON_EMAIL: Joi.string()
        .default("")
        .description("Common sender mail id"),
    COMMON_PASSWORD: Joi.string()
        .default("")
        .description("Common sender mail password")
}).unknown().required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    jwtTokenExpire: envVars.JWT_TOKEN_EXPIRE,
    mongoURI: envVars.MONGO_DB_URI,
    COMMON_EMAIL: envVars.COMMON_EMAIL,
    COMMON_PASSWORD: envVars.COMMON_PASSWORD
};

export default config;
