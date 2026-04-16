
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask" , (req, res) =>{
    const { question } = req.body;

    console.log("question:"  , question);
    console.log("History", history);
    res.json({
        answer:"Backend working"
    })
})


app.listen( 3000 , () =>{
    console.log("Server is running on port 3000");
})