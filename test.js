import { config } from "dotenv";
config({ path: process.ENV })
    
let x = process.env.APOLLO_KEY;
console.log(x);