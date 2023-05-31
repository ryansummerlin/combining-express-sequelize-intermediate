// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

const { Insect } = require('../db/models');
const { Op } = require('sequelize');

/**
 * INTERMEDIATE BONUS PHASE 2 (OPTIONAL) - Code routes for the insects
 *   by mirroring the functionality of the trees
 */

// Get all insects in database
router.get('/', async (req, res, next) => {
    let insects = [];

    insects = await Insect.findAll({
        attributes: ['id', 'name', 'millimeters'],
        order: [
            ['millimeters', 'ASC']
        ]
    });

    res.json(insects);
});


// Get insect by id
router.get('/:id', async (req, res, next) => {
    let insect;

    try {
        insect = await Insect.findOne({
            where: { id: req.params.id}
        });

        if (insect) {
            res.json(insect);
        } else {
            next({
                status: "not-found",
                message: `Could not find insect ${req.params.id}`,
                details: 'Insect not found'
            });
        }
    } catch(err) {
        next({
            status: "error",
            message: `Could not find insect ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});


// Create an insect
router.post('/', async (req, res, next) => {
    try {
        [insectName, description, fact, territory, millimeters] = [req.body.name, req.body.description, req.body.fact, req.body.territory, req.body.millimeters];

        const newInsect = await Insect.create({ name: insectName, description: description, fact: fact, territory: territory, millimeters: millimeters });

        res.json({
            status: "success",
            message: "Successfully created new insect",
            data: newInsect
        });
    } catch(err) {
        next({
            status: "error",
            message: 'Could not create new insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});


// Delete an insect
router.delete('/:id', async (req, res, next) => {
    try {
        const insectId = req.params.id;
        const insect = await Insect.findOne({ where: {id: insectId} });

        if (!insect) {
            next({
                status: 'not-found',
                message: `Could not remove insect ${insectId}`,
                details: 'Insect not found'
            });
        }

        await insect.destroy();

        res.json({
            status: "success",
            message: `Successfully removed insect ${req.params.id}`,
        });
    } catch(err) {
        next({
            status: "error",
            message: `Could not remove insect ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});



// Update an insect
router.put('/:id', async (req, res, next) => {
    try {
        const insectId = req.params.id;

        [insectName, description, fact, territory, millimeters] = [req.body.name, req.body.description, req.body.fact, req.body.territory, req.body.millimeters];

        const insect = await Insect.findOne({ where: { id: insectId } });

        if (!(insectId == req.body.id)) {
            next({
                status: 'error',
                message: 'Could not update insect',
                details: `${insectId} does not match ${req.body.id}`
            });
        } else if (!insect) {
            next({
                status: 'not-found',
                message: `Could not update insect ${insectId}`,
                details: 'Insect not found'
            });
        } else {
            insect.update({
                name: insectName,
                description: description,
                fact: fact,
                territory: territory,
                millimeters: millimeters
            });

            res.json({
                status: "success",
                message: `Successfully updated insect`,
                data: insect
            });
        }

    } catch(err) {
        next({
            status: "error",
            message: 'Could not update new insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});


// Search for insects
router.get('/search/:value', async (req, res, next) => {
    let insects = [];

    insects = await Insect.findAll({ attributes: ['id', 'name', 'millimeters'],
        order: [ ['millimeters', 'ASC'] ],
        where: {
            name: {
                [Op.like]: `%${req.params.value}%`
            }
        }});

    res.json(insects);
});

// Export class - DO NOT MODIFY
module.exports = router;
