import { Sequelize } from "sequelize";

export const startTransaction = async (config: Sequelize) => {

    return config.transaction(async (t) => {

    })
}