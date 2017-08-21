# FCC TV service contours

To run this app we need:
- node.js v6.11.2
- running mongodb v3.4.7

## Populating database

Current FCC TV service contours data points can be downloaded from [TV service page](ftp://ftp.fcc.gov/pub/Bureaus/MB/Databases/tv_service_contour_data/TV_service_contour_current.zip) or from terminal.
 File should be unzipped before executing import command.
```
wget ftp://ftp.fcc.gov/pub/Bureaus/MB/Databases/tv_service_contour_data/TV_service_contour_current.zip
unzip TV_service_contour_current.zip
```
File will be extracted to export/home/radioTVdata/results/TV_service_contour_current.txt

To make inserts in local mongodb in main folder run command 
```
npm run import export/home/radioTVdata/results/TV_service_contour_current.txt
```
This operation may tak a while, as original data is about 100MB to parse, insert and index. Lines of data happen to be corrupted from time to time but script will try to fix the problem and continue to insert.

## Running app

To run app run command 
```
npm run app
```
App runs with set of default configuration specified in ```defaults.json``` file. Settings can be changed directly using that file or using environmental variables. Settings that are avaible throught env

- PORT - specifies express app port number to listen for requests, default 3000
- DB_HOST - database host in 'mongodb://localhost' format
- DB_PORT - database port, default 27017
- SECRET - specifies jsonwebtoken secret for token verification, default 'secretsecret'

Add DEBUG=app* to env to see whats happening.

API serves one endpoint /query that requires valid json web token and pass two arguments in query, lat and lon (latitude, logitude). Server responds with a list of antennas that have their reception at given point.

## Task

Task has specified example endpoint http://localhost/query?lat=36.21860&lon-105.72500. Given adress has no port specified after host, that means app must be run on port 80. To achive that app can be run on diffrent port and then configured in apache or nginx. 

Example endpoint seems to have mistake when giving longitude. It misses equal sign before giving parameter.

Additional points for getting request back in less 100ms. To achive that:
- indexed geoJSON in mongo to achive superfast geosearch; without indexes same query took aprox. 26 seconds.
- projection removes _id and contours fields from response, which increased response time 5 times. I did that because task specified to return a list of antennas, not their contours.