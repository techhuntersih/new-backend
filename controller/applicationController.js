const { dbExecution } = require('../model')

const createNewApplication = async(req, res) => {
    try{
        // console.log(req.body)
        // console.log(JSON.stringify(req.body.father))
        let data = req.body;
        let query = `INSERT INTO application_details(name,date_of_birth,age,gender,state,email,contact_no,degree_of_hearing_loss,type_of_hearing_loss,father_details) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)`;
        let list = [data.child.name, data.child.date, data.child.age, data.child.gender, data.child.state, data.child.email, data.child.contact_no, data.child.degree, data.child.type, JSON.stringify(data.father),JSON.stringify(data.mother),JSON.stringify(data.family),JSON.stringify(data.displayChild),JSON.stringify(data.preference)]
        //   let query =  `INSERT INTO application_details(name,date_of_birth,age,gender,state,email,contact_no,degree_of_hearing_loss,type_of_hearing_loss) 
        //     VALUES('${req.body.child.name}','${req.body.child.dob}','${req.body.child.age}','${req.body.child.gender}','${req.body.child.state}','${req.body.child.email}','${req.body.child.contact_no}','${req.body.child.degree_of_Hearing_Loss}','${req.body.child.type_of_hearing_loss}')`
        // console.log(query);
        let result = await dbExecution(query, list);
        
        // console.log("inserted")
        // console.log(result);                   
        return res.status(200).json({insertid : result.insertId})
          
        }catch(e){
            console.log(e);
        }
}

const checkApplicationStatus = async (req, res) => {
    try{
        console.log(req.body.registration_number)
        let query = `SELECT status
          FROM application_details
          WHERE id=?`
       let list = [req.body.registration_number]
       const result = await dbExecution(query, list);
        //   let result = await connection.query(query);
        //     console.log("displayed")
        // console.log(result);                   
        return res.status(200).json({result: result})
          
    }catch(e){
        console.log(e);
    }
}

const getApplicationDetails = async(req, res) => {
    try{
        let query = `SELECT * FROM application_details`;
        let list = [];
        let result = await dbExecution(query,list);
        // console.log(result);
         for(var i=0 ;i<result.length;i++){
            result[i].father_details=JSON.parse(result[i].father_details)
         }
        return res.status(200).json({data : result})
    }
    catch(error) {
        console.log(error)
        return res.status(400).json({ message : error.message})
    }
    
}

const filterApplicationsForHOD = async(req, res) => {
    let { status } = req.query;

    console.log("status : ", status );
    let query = `SELECT * from application_details WHERE status=?`;
    let list = [status];
    let result = await dbExecution(query,list);

    for(var index=0 ;index < result.length; index++) {
        result[index].father_details=JSON.parse(result[index].father_details)
    }

    return res.status(200).json({data : result})
}

const updatestatus = async(req, res) => {
    try{
        const id = req.body.id;
        const status = req.body.status;
        let query = `UPDATE application_details SET status = ? WHERE id = ?`;
        let list = [status,id];
        let result = await dbExecution(query,list);
        // console.log(result);
        return res.status(200).json({data : result})
    }
    catch(error) {
        console.log(error)
        return res.status(400).json({ message : error.message})
    }
    
}

const getApplicationDetailsForZC = async(req, res) => {
    let status = req.query.status;

    if( !req.query.status ) {
        status = "eligible";
    }
    let query = `SELECT * from application_details WHERE status=?`;
    let list = [status];
    let result = await dbExecution(query,list);

    console.log("result : ", result);

    for(var index=0 ;index < result.length; index++){
        result[index].father_details=JSON.parse(result[index].father_details)
    }

    return res.status(200).json({data : result})
}

const getApplicationDetailsForHospitalLogin = async(req, res) => {
    try{
        let query = `SELECT * FROM application_details where assigned_hospital=?`;
        let list = [req.user_id];
        let result = await dbExecution(query,list);
        // console.log(result);
         for(var i=0 ;i<result.length;i++){
            result[i].father_details=JSON.parse(result[i].father_details)
         }
        return res.status(200).json({data : result})
    }
    catch(error) {
        console.log(error)
        return res.status(400).json({ message : error.message})
    }
    
}

const getHospitalsforPreferenceList = async(req, res) => {
    try{
        let query = `SELECT id,hospital_name FROM hospital_list`;
        let list = [];
        let result = await dbExecution(query,list);
        // console.log(result);
        //  for(var i=0 ;i<result.length;i++){
        //     result[i].father_details=JSON.parse(result[i].father_details)
        //  }
        return res.status(200).json({data : result})
    }
    catch(error) {
        console.log(error)
        return res.status(400).json({ message : error.message})
    }
    
}
module.exports = {createNewApplication, checkApplicationStatus, getApplicationDetails,updatestatus, filterApplicationsForHOD, getApplicationDetailsForZC,getApplicationDetailsForHospitalLogin,getHospitalsforPreferenceList}