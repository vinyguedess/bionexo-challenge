import { Router } from 'express';  
import { UBS } from './Models/UBS';
import { CSVToJson } from './../../Services/ConverterService';


export const router = Router();

router.post('/ubs/sync', async (request, response) => 
{
    let { media } = request.body;
    if (!media)
        return response.status(403).json({
            'status': false,
            'errors': [ 'Necessary pass a media field with buffered CSV file' ]
        });

    let ubses = await Promise.all(
        CSVToJson(new Buffer(media, 'base64').toString('utf8'))
            .map(ubs => UBS.findCreateFind({
                'where': {
                    'name': ubs.name,
                    'geocode_lat': ubs.geocode_lat,
                    'geocode_lon': ubs.geocode_lon
                },
                'defaults': ubs
            }).then(([ubs, response]) => ubs.dataValues))
    );    

    response.status(200).json({
        'status': true,
        'data': { ubses }
    })
});

router.post('/ubs', (request, response) => 
{
    UBS.create(request.body.ubs)
    .then(ubs => {
        response.status(201).json({
            'status': true,
            'data': { ubs }
        });
    })
    .catch(err => {
        response.status(403).json({
            'status': false,
            'errors': [ err.message ]
        });
    });
});


router.get('/ubs', (request, response) => 
{
    let { limit, offset } = request.query;

    UBS.findAndCount({
        'limit': limit || 10, 
        'offset': offset || 0
    })
    .then(({ count, rows }) => {
        response.status(200).json({
            'status': true,
            'data': { 'total': count, 'results': rows }
        })
    });
});


router.get('/ubs/:id', async (request, response) => 
{
    let ubs = await UBS.findById(request.param('id'));
    if (!ubs)
        return response.status(404).json({
            'status': false,
            'errors': [ 'UBS not found' ]
        });

    return response.status(200).json({
        'status': true,
        'data': { ubs }
    });
});