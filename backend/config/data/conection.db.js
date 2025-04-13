import pgk from "pg";
import  {envs}  from "./config/envs.js";


const {Pool} = pgk;

const pool = new Pool({
    host : envs.host_db,
    user : envs.user_db,
    password : envs.pass_db,
    database : envs.data_db,
    allowExitOnIdle : true

})

export default pool;


