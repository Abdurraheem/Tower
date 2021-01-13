
export const validateTower = async(req, res, next) => {

 const { name, floor, location, office, rating, latitude, longitude } = req.body;

 if(!name){
    return res.status(400).json({status: 400, message: 'Name not found'});
 }
  if(!floor){
     return res.status(400).json({status: 400, message: 'Number of floor not found'});
 }
  if(!location){
   return res.status(400).json({status: 400, message: 'Location not found'});
 }
  if(!office){
    return res.status(400).json({status: 400, message: 'Number of offices not found'});
 }
  if(!rating){
    return res.status(400).json({status: 400, message: 'Rating not found'});
 }
 if(!latitude){
    return res.status(400).json({status: 400, message: 'Latitude number not found'});
 }
 if(!longitude){
    return res.status(400).json({status: 400, message: 'Longitude not found'});
 }
 
 req.body.name = name.trim();
 req.body.location = location.trim(); 
 
 return next();
}

/**
* Validate for pagination
*/
export const validateOffsetLimit = async(req, res, next) =>{

 const { offset, limit } = req.query;

 if(!offset){
    return res.status(400).json({status: 400, message: 'Offset not found'});
 }
  if(!limit){
     return res.status(400).json({status: 400, message: 'Limit of floor not found'});
 }
 req.query.offset = Number(offset);
 req.query.limit = Number(limit); 
 
 return next();

}
