const { addSchoolInfo, getSchoolsInfo } = require('../Model/schoolModel');



exports.addSchool= async (req,res,)=>{


console.log("Request Body:",req.body);

try{
  const results=await addSchoolInfo(req.body);
  if(results && results[0].affectedRows > 0) {
    res.status(201).json({message: "School added successfully"});
  }
  else {
    res.status(400).json({message: "Failed to add school"});
  }
}
catch (error) {
  console.error('Error adding school:', error);
  res.status(500).json({message: "Internal server error AT addSchool Controller"});

}
}

exports.getSchools = async (req, res) => {
  const { longitude, latitude } = req.query;
  

  
  const userLat = parseFloat(latitude);
  const userLong = parseFloat(longitude);
  


  
  try {
    const results = await getSchoolsInfo(userLat, userLong);
    console.log("Results from getSchoolsInfo:", results);
    
    if (results && results.length > 0) {
      res.status(200).json({
        success: true,
        count: results.length,
        schools: results
      });
    } else {
      res.status(200).json({
        success: true,
        count: 0,
        message: "No schools found",
        schools: []
      });
    }
    
  } catch (error) {
    console.error('Error retrieving schools:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error while retrieving schools"
    });
  }
};