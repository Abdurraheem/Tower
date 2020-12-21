# TOWER

### Prerequisites

Node
yarn
Express
jsonwebtoken
mysql
sequelize


API using mysql database with sequelize ORM.


### Clone

- Clone this repo to your local machine using [https://github.com/Abdurraheem/Tower.git]

### Setup

> now install yarn and packages

```shell
$ yarn install
$ bower install (if require)
```

Create Mysql DB name with tower

## Make sure your redis server is running

## Running the tests

Open up Postman!

Let's create some Tower.

For creating the tower we need authorization header first, you can create the token using https://jwt.io/ and put the following payload with the secret :

{
  "name": "Mohammad Raheem",
  "iat": 1516239022
}

use secret : Im_Secret   (without base64 encoded)

you will get the token, copy it.

And Run the curl as: 

curl -L -X POST 'http://localhost:9001/api/v1/tower' \
-H 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.-joSNIKm_vGV3fBvvBvmEVO20awcNYhRCRKpTQWoksc' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=Burz Dubai' \
--data-urlencode 'location=Dubai' \
--data-urlencode 'floor=50' \
--data-urlencode 'office=10' \
--data-urlencode 'rating=9' \
--data-urlencode 'latitude=45' \
--data-urlencode 'longitude=45'



You will get list of tower using the below curl...

curl -L -X GET 'http://localhost:9001/api/v1/tower?offset=0&limit=10&location=India&name=delhi'

here offset and limit are mandotory and rest can be use for filters

To delete the tower:

curl -L -X DELETE 'http://localhost:9001/api/v1/tower/7' \
-H 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.-joSNIKm_vGV3fBvvBvmEVO20awcNYhRCRKpTQWoksc'

For update record use below curl:
curl -L -X PUT 'http://localhost:9001/api/v1/tower' \
-H 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.-joSNIKm_vGV3fBvvBvmEVO20awcNYhRCRKpTQWoksc' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'towerId=8' \
--data-urlencode 'name=noida Burj'


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
