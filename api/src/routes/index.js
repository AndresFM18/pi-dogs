const { Router } = require('express');
const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
const { Temperamento, Raza } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.get('/dogs', async function (req, res) {
    const nombre = req.query.nombre;
    let respuesta = [];

    if (nombre) {
        await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nombre}&apiKey=${API_KEY}`)
            .then((response) => { respuesta = response.data })
            .then(() => {
                if (respuesta[0] == undefined) {
                    return res.send('no hay resultados para la busqueda')
                } else {
                    let arreglo = respuesta.map((x) => { return { id: x.id, nombre: x.name, temperamento: x.temperament, peso: x.weight.metric, imagen: x.reference_image_id } })
                    return res.send(arreglo)
                }
            })
    } else {
        await axios.get(`https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`)
            .then((response) => { respuesta = response.data })
        return res.send(respuesta)
    }
})

router.get('/dogs/:id', async function (req, res) {
    const id = req.params.id;
    let respuesta = [];
    const Number_id = Number(id);

    if (isNaN(Number_id)) {
        try {
            return res.send('el id debe ser un numero')
        } catch (error) {
            return res.send(error.message)
        }
    }
    if (Number_id <= 0) {
        try {
            return res.send('El id debe ser mayor a 0')
        } catch (error) {
            return res.send(error.message)
        }
    }
    if (Number_id % 1 != 0) {
        try {
            return res.send('El id no puede ser decimal ')
        } catch (error) {
            return res.send(error.message)
        }
    }
    if (Number_id > 252) {
        try {
            await Raza.findByPk(Number_id, {
                include: Temperamento,
            })
                .then((razad) => {
                    if (razad == null) {
                        return res.send('No existe en la base')
                    }
                    return res.send(razad);
                })
        } catch (error) {
            return res.send(error.message);
        }
    } else {
        await axios.get(`https://api.thedogapi.com/v1/breeds`)
            .then((response) => { respuesta = response.data })
            .then(() => {
                let arreglo = respuesta.filter(x => x.id == id)
                if (arreglo[0] == undefined) {
                    return res.send('este id no existe')
                }
                return res.send(arreglo)
            })
    }





})



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
