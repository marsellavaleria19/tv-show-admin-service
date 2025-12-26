# TV SHOW ADMIN SERVICE
This is the Backend API repository from TV Show Admin. This repository generates a program that can access TV Show data with an API. This program can make it easier for us to retrieve data from the database by accessing the available links or endpoints. Links or end points provided to access all data tv show.

## About
Repository Backend - TV Show Admin

## Tech Stack
- Framework: Node.js/Express
- Database: MySQL
- Library : Sequelize
  
## Endpoint
#### Data TV Show Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /shows | Get all data tv show|
| ```GET``` | /shows?name=xx | Get all data tv show by name |
| ```GET``` | /shows?pagexx&limit=xx | Get all data tv short with pagination |
| ```GET``` | /shows?sort=xx&order=xx | Get data tv show by sorting and order |
| ```GET``` | /shows/sync | Get data tv show from synchronize API Public |
| ```GET``` | /shows/:id | Get data tv show by id |
| ```POST``` | /shows | Create data tv show|
| ```POST``` | /shows/sync | Syncrhronize data tv show with API Public|
| ```PATCH``` | /shows/:id | update partial data shows by id|
| ```DELETE``` | /shows/:id | delete data shows by id|

#### Data Synchronize Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /shows/sync | Get data tv show from synchronize API Public |
| ```GET``` | /shows/last-sync | Get last synchronize date |
| ```POST``` | /shows/sync | Syncrhronize data tv show with API Public|

#### Data Synchronize Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /shows/dashboard | Get total tv show data by category and by premiere date |

## INSTALLATION
step for install application :
1. clone this repository ```git clone https://github.com/marsellavaleria19/rvrental-backend.git```.
2. Copy env-example file and rename to .env file, then fill it with the following configuration:
  ### Application Configuration
  | CONFIG | DESCRPTION | REMARKS |
| :-------------: |:-------------:|:-----------:|
|PORT| filled with port API | example : 5000|
|PUBLIC_API_URL| filled with url api public | example : https://api.tvmaze.com/shows |

 ### Database Configuration
  | CONFIG | DESCRPTION | REMARKS |
| :-------------: |:-------------:|:-----------:|
|DB_HOST|filled with databse host. | example : localhost (because i use xampp, so i filled with 'localhost') |
|DB_USER|filled with database username|example : root (because i use php my admin, so i filled with 'root')|
|DB_PASSWORD|filled with database passord, if any| |
|DB_NAME|filled with database name you make in database tools |example : db_tvshow (because i make database db_tvshow in php my admin)|

3. install package with running code ```npm install``` in terminal
4. run application with running code ```npm run dev``` in terminal 
