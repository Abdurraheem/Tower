import jwt from 'jsonwebtoken';
import tower from '../models/tower.model';
import bcrypt from 'bcryptjs';
import CONFIG from '../config';
import hash from 'object-hash';



// Async function to get the Tower List
export const getTowerList = async (filters,req) => { 
    const options = {};
    const { name, location, limit, offset } = filters;
    if (name) {
      options.name = name;
    }
    if (location) {
      options.location = location;
    }
    const redis_client = req.redis;
    const filterKey = `${hash(filters)}`;
    // Try Catch the awaited promise to handle the error 
    try {
          const response = { };
          const { count, rows } = await findInTower(options, [['createdAt', 'desc']], limit, offset * limit);
          response.count = count;
          response.rows = rows;
          //add data to Redis
          redis_client.setex(filterKey, 3600, JSON.stringify(response));
        
          return response;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while fetching Tower' + e.message);
    }
}

export const createTower = async param => {    
    try {
        // Saving the tower 
        await tower.create({ ...param });
        return 'success';
    } catch (e) {
        const error = new Error();
          error.status = 400;
          error.message = e.message;
          throw error;
    }
}

export const updateTower = async (id, param) => {      
    try {
        // updating the tower
        await updateTowerDocs(param, {id: id } );
        return 'success';
    } catch (e) {
        const error = new Error();
          error.status = 400;
          error.message = e.message;
          throw error;
    }
}

export const deleteTower = async (id) => { 
    // Delete the tower
    try {
        await deleteInTower({
            id: id
        });
        return 'success';
    } catch (e) {
        throw Error("Error Occured while Deleting the tower "+e)
    }
}


const findInTower = (whereParams, order, limit = 10, offset = 0) =>
      tower.findAndCountAll({
      where: whereParams,
      order,
      offset,
      limit
    });

const deleteInTower = whereParams =>{
 tower.destroy({
      where: whereParams
    });
}
  

export const fetchTowerStatus = whereParams =>
    tower.findAndCountAll({
      where: whereParams,
      order: [['id', 'desc']]
    });

const updateTowerDocs = (fields, whereParams) => tower.update(fields, { where: whereParams });   



