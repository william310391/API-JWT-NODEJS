import cors  from "cors";

export const corsConfig=()=>{
    return cors({
        origin: ['http://localhost:5173'],
    })
}