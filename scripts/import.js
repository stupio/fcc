const fs = require('fs');
const rl = require('readline');
const cp = require('child_process');
const ts = Date.now();

const ARGV = process.argv.slice(2);
const DB = 'fcc';
const COLLECTION = 'antennas';

let pathIndex = ARGV.indexOf('--file') + 1;
let path = ARGV[pathIndex] || ARGV[0];
let OUTPUT = './fcc_data.json';

if (!path) {
    throw new Error('file path not specified');
}

cp.execSync(`mongo ${DB} --eval "db.dropDatabase();"`);
cp.execSync(`mongo ${DB} --eval "db.${COLLECTION}.createIndex({\\\"contours\\\": \\\"2dsphere\\\"});"`);

fs.writeFile(OUTPUT, '');

let lineReader = rl.createInterface({
    input: fs.createReadStream(path),
});

console.log('Preparing json');

lineReader.on('line', function (line) {
    let doc = extract(line);
    fs.appendFile(OUTPUT, doc + '\n');
});

lineReader.on('close', () => {
    setTimeout(() => {
        console.log('Populating database', DB);
        cp.execSync(`mongoimport --db ${DB} --collection ${COLLECTION} --file ${OUTPUT}`);
        fs.unlinkSync(OUTPUT);
        console.log(`Populate took ${(Date.now() - ts) / 1000}s`);
    }, 300);
});


function extract (line) {
    const appId = Number.parseInt(line.slice(0, 9));
    const [service, description] = line.slice(10, 49).split(' ');
    let coordinates = new Set(line.slice(50).split('|')); // set is for removing duplicates from array

    coordinates = Array.from(coordinates).map(element => {
        return element.split(',').map(pos => parseFloat(pos)).reverse();
    });

    const location = {
        type: 'Point',
        coordinates: coordinates.shift(),
    }

    if (coordinates.length > 361) {
        console.warn(`WARN: antenna ${appId} has wrong format`);
        coordinates.length = 361;
    }

    coordinates.pop(); // removes NaN
    coordinates.push(coordinates[0]); // closes polygon

    const contours = {
        type: 'Polygon',
        coordinates: [coordinates],
    }

    const json = {
        appId,
        service,
        description,
        location,
        contours,
    }

    return JSON.stringify(json);
}