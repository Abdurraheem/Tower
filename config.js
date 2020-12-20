const CONFIG = {
	"SECRET" : 'Im_Secret',
	"database": {
    "username": "root",
    "password": "root",
    "database": "tower",
    "host": "localhost",
    "dialect": "mysql",
    "pool": {
      "max": 10,
      "min": 2,
      "idle": 10000
    }
  }
}

export default CONFIG;