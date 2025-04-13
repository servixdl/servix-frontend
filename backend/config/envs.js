import dotenv from 'dotenv'
dotenv.config()


const envs =  {
    port: process.env.PORT,
}


export {envs}