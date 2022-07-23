const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        surname: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: true,
            default: 'Australia'
        },
        subject: {
            type: String,
            required: false
        }
    }
);

module.exports = model('ContactSchema', ContactSchema, 'ContactSchema');