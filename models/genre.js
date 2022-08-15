const mongoose = require('mongoose')
const Joi = require('joi')   

const Genre = mongoose.model('Genre',
    new mongoose.Schema({
        name: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 64
        }
    }
))

function genreIsValid(genre) {
    const genreSchema = Joi.object({
        name: Joi.string().min(5).max(64).required()
    })
    
    const { error } = genreSchema.validate(genre)
    if(error) return error.details[0].message

    return true
}

module.exports.Genre = Genre
module.exports.genreIsValid = genreIsValid