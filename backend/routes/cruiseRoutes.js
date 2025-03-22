const express = require('express');
const router = express.Router();
const Cruise = require('../models/Cruise');

router.post('/', async (req, res) => {
    try {
        const newCruise = new Cruise(req.body);
        const savedCruise = await newCruise.save();
        res.status(201).json(savedCruise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const cruises = await Cruise.find();
        res.json(cruises);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cruise = await Cruise.findOne({ id: req.params.id });
        if (!cruise) return res.status(404).json({ message: "Cruise not found" });
        res.json(cruise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCruise = await Cruise.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(updatedCruise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Cruise.findOneAndDelete({ id: req.params.id });
        res.json({ message: "Cruise deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
