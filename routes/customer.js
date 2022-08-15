const express = require('express')
const router = express.Router()
const {Customer, customerIsValid} = require('../models/customer')

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

router.get('/:id', async (req, res) => {

    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given ID was not found') ///404 code means not found

    res.send(customer)
})

router.post('/', async (req, res) => {
    const validationResult = customerIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    let customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold })
    customer = await customer.save()

    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const validationResult = customerIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, {new: true})

    if(!customer) return res.status(404).send('The customer with the given Id was not found')

    return res.send(customer)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer) return res.status(404).send('The customer with the given Id was not found')

    return res.send(customer)
})

module.exports = router