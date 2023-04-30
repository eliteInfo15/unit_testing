const express=require('express');
const mysql = require('mysql2/promise');
const cors= require('cors');
const app=express();

app.use(cors({origin:true}));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send({'message':'hello world'});
})


app.get('/users',async (req,res)=>{

    try{
        let name=req.query.name;
        let conn=await pool.getConnection();
        let query=`select * from users where user_name='${name}'`;
        const [rows, fields] = await conn.execute(query);
        res.send(rows);
        conn.release();    
    }catch(error)
    {
        res.status(500).send("error : "+error);
    }
}
)

app.listen(8000,()=>{
    console.log('listinenig...');
})