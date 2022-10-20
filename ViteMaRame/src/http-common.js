import axios from "axios";

export default axios.create({
    headers:{
        "Content-type": "application/json",
        "Authorization": "db179dae-2cfa-49e3-8792-b608d70a3318"
    }
})