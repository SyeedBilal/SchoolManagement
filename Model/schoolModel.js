const db=require('../utils/sqlConfig');
const addSchoolInfo= async(schoolData) => {

 
  console.log("Adding School Info:", schoolData);

  try{

    const query ='INSERT INTO schools (name,address,latitude,longitude) VALUES(?,?,?,?)';

    return await db.execute(query,[schoolData.name,schoolData.address,schoolData.latitude,schoolData.longitude]);
  }
  catch (error) {
    console.error('Error adding school info:', error);
    throw error; 
  }

}

const getSchoolsInfo = async (userLat, userLong) => {
  console.log("userLat:", userLat, "userLong:", userLong);
  
  try {

    const queryResult = await db.query('SELECT * FROM schools;');
    
   
    const sortedSchools = queryResult[0]
      .map((school) => {
        const distance = calculateDistance(userLat, userLong, school.latitude, school.longitude);
        return {
          ...school,
          distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
        };
      })
      .sort((a, b) => a.distance - b.distance);
    
    console.log('Sorted Schools:', sortedSchools);
    return sortedSchools;
    
  } catch (error) {
    console.error('Error fetching schools info:', error);
    throw error;
  }
};


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
module.exports= {
  addSchoolInfo,
  getSchoolsInfo
}