const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: [true, 'Original URL is required'],
            trim: true,
        },

        shortId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        }

    },
    { timestamps: true }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;