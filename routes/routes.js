const express = require("express");
const router = express.Router();
const { createNewApplication, checkApplicationStatus, getApplicationDetails,updatestatus, filterApplicationsForHOD, getApplicationDetailsForZC,getApplicationDetailsForHospitalLogin } = require('../controller/applicationController');
const {login,Professionallogin} = require('../controller/userController');
const { verifyHODToken,verifyZCToken ,verifyHospitalToken} = require("../middleware");
router.post('/login', login);
router.post('/hospitallogin', Professionallogin);
router.post('/create-new-application', createNewApplication);
router.post('/check-application-status', checkApplicationStatus)
router.get('/get-applciation-details-HOD', verifyHODToken, getApplicationDetails);
router.get('/get-applciation-details-ZC', verifyZCToken, getApplicationDetailsForZC );
router.get('/get-applciation-details-Hospitallogin', verifyHospitalToken, getApplicationDetailsForHospitalLogin );
router.get('/filtered-application-details-HOD', verifyHODToken, filterApplicationsForHOD);
router.put('/updatestatus', updatestatus);
module.exports = router;
