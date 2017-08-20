let mongoose = require('mongoose');
let debug = require('debug')('app-schema');

let antennaLocationSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    coordinates: [{
        type: Number,
        required: true,
    }],
}, { _id: false});

let receptionPolygonSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    coordinates: [[[{
        type: Number,
        required: true,
    }]]],
}, { _id: false});

let antennaSchema = mongoose.Schema({
    appId: {
        type: Number,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: antennaLocationSchema,
    contours: receptionPolygonSchema,
});

antennaSchema.index({contours: '2dsphere'});

antennaSchema.statics.findAntennas = function (lat, lon) {
    debug('finding antennas at', lat, lon);

    let searchQuery = {
        contours: {
            $geoIntersects: {
                $geometry: {
                    type: 'Point',
                    coordinates: [lon, lat],
                }
            }
        }
    }

    let projection = {_id: 0, contours: 0};

    let ts = Date.now();

    debug('search query:', JSON.stringify(searchQuery));

    return this.find(searchQuery, projection).then(data => {
        debug('db request time', Date.now() - ts);
        return data;
    });
}

module.exports = mongoose.model('antenna', antennaSchema);

