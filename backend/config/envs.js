import dotenv from 'dotenv'
dotenv.config()


const envs =  {
    port: process.env.PORT,
    host_db : process.env.HOST,
    user_db : process.env.USER,
    pass_db : process.env.PASS,
    data_db : process.env.DATA
}


export {envs}
