var express=require('express');
var cors = require('cors')
var app=express();
app.get('/',function(req,res){
     res.send('Helooworld !')
})

app.use(cors());
app.use(express.json())
app.use("/api", require('./routes/routes'))
// const connection =  sql.createPool({
//     host :"sql6.freesqldatabase.com",
//     user:"sql6511526",
//     password :"av3YdrcipN",
//     database :"sql6511526",
//     port:3306,
// })

// app.post('/create-new-application', createNewApllication);

// app.post('/check-application-status', checkApplicationStatus)
// app.post('/check',async(req,res)=>{
//     try{
//     console.log(req.body)
//       let query = `SELECT *
//       FROM application_details
//       WHERE id=?
//       `
//    console.log(query);

//    list = [req.body.registration_number]
//    const result = await dbExecution(query, list);
//     //   let result = await connection.query(query);
//     //     console.log("displayed")
//     console.log(result);                   
//     return res.status(200).json({result: result})
      
//     }catch(e){
//         console.log(e);
//     }

// }
// )
app.listen(5000,function(req,res){
    console.log("server started");
})
