import * as TowerService from '../services/tower.service';


// Async Controller function to get the Tower List
export const getTower = async (req, res) => {    
   
    // Check the existence of the query parameters, If doesn't exists assign a default value
    const { offset , limit, name, location } = req.query;
    try {
        const towerList = await TowerService.getTowerList({name, location, offset, limit},req);
        // Return the tower list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: towerList, message: "Succesfully tower  list Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


export const createTower = async (req, res) => {
    const { name, floor, location, office, rating, latitude, longitude } = req.body;
    const userId = req.userId;

    const tableEntry = {
      name,
      floor,
      location,
      office,
      rating,
      latitude,
      longitude,
      createdBy: userId
    };
    try {
        //check if tower already exists by name
        const options = { name: tableEntry.name };
        const error = new Error();
        const { rows, count } = await TowerService.fetchTowerStatus(options);
        if(count > 0){
          error.status = 400;
          error.message = `Tower with the name ${tableEntry.name} already exists`;
          throw error;
        }else{
         // Calling the Service function with the new object from the Request Body
         var createdTower = await TowerService.createTower(tableEntry);
         return res.status(200).json({status: 200, message: "Tower Registered Succesfully"})  
        }

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}



export const updateTower = async (req, res) => {
    // Id is necessary for the update
    let params = {};
    if (!req.body.towerId) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }
    const id = (req.body.towerId).trim();
    if(req.body.name){
      params.name = (req.body.name).trim();
    }
    if(req.body.location){
     params.location = (req.body.location).trim();
    }
    if(req.body.floor){
     params.floor = Number(req.body.floor);
    }
    if(req.body.office){
     params.office = Number(req.body.office);
    }
    if(req.body.latitude){
     params.latitude = Number(req.body.latitude);
    }
    if(req.body.longitude){
     params.longitude = Number(req.body.longitude);
    }
    try {
        const updatedTower = await TowerService.updateTower( id, params);
        await req.redis.flushdb();
        return res.status(200).json({status: 200, data: updatedTower, message: "Succesfully Updated Tower"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

export const deleteTower = async (req, res) => {
    var id = req.params.id;
    try {
        var deleted = await TowerService.deleteTower(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
