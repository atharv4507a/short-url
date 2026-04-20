const { nanoid } = require('nanoid');
const Url = require('../model/urlModel');

const create = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: 'URL required'
            });
        }

        const newUrl = await Url.create({
            originalUrl,
            shortId: nanoid(6),
        });

        res.status(201).json(newUrl);

    } catch (err) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const redirect = async (req, res) => {
    try {
        const url = await Url.findOne({
            shortId: req.params.shortId
        });

        if (!url) {
            return res.status(404).send('Not found');
        }


        res.redirect(url.originalUrl);

    } catch (err) {
        res.status(500).send('Error');
    }
};

const getAll = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;
        await Url.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    create,
    redirect,
    getAll,
    deleteUrl
};
