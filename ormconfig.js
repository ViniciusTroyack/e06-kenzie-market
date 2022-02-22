require('dotenv').config()

const devEnv = {
    type: 'postgres',
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    },
    logging: true,
    synchronize: false,
};

module.exports = devEnv;