const express = require('express')
const router = express.Router()

const genres = [{
        id: 1,
        name: 'Drama'
    },
    {
        id: 2,
        name: 'Action'
    },
    {
        id: 3,
        name: 'Horror'
    },
    {
        id: 4,
        name: 'Comedy'
    },
    {
        id: 5,
        name: 'Fiction'
    }
]

const genreSchema = Joi.object({
    name: Joi.string().min(3).required()
})

function genreIsValid(genre) {
    const {
        error
    } = genreSchema.validate(genre)
    if (error) return error.details[0].message || true
}

router.get('/', (req, res) => {
    return res.send(genres)
})

router.get('/:id', (req, res) => {

    var genre = genres.find(c => c.id === parseInt(req.params.id))

    if (!genre) return res.status(404).send('The genre with the given ID was not found') ///404 code means not found

    res.send(genre)
})

router.post('/', (req, res) => {
    console.log(req.body)
    const validationResult = genreIsValid(req.body)
    console.log(">>>" + validationResult)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    var genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);

    res.send(genre)
})

router.put('/:id', (req, res) => {
    const validationResult = genreIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    var genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given ID was not found')

    genre.name = req.body.name

    return res.send(genre)
})

router.delete('/:id', (req, res) => {
    var genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given ID was not found')

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    return res.send(genre)
})

module.exports = router