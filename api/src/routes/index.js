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

router.post('/dogs', async function (req, res) {

    const { nombre, peso, temperamento, altura, edad } = req.body;
    let PesoNumber = Number(peso);
    let AlturaNumber = Number(altura);
    let EdadNumber = Number(edad);

    try {
        if (typeof nombre != 'string') {
            return res.send('El nombre deber ser una string')
        }
        if (isNaN(PesoNumber)) {
            return res.send('El peso debe ser un numero')
        }
        if (isNaN(AlturaNumber)) {
            return res.send('La altura debe ser un numero')
        }
        if (isNaN(EdadNumber)) {
            return res.send('La edad debe ser un numero')
        }
    } catch (error) {
        return res.send(error.message)
    }
    //Aun falta implementar el include de temperamento
    try {
        await Raza.create({
            nombre: nombre,
            altura: altura,
            peso: peso,
            edad: edad
        })
            .then((creacion) => {
                if (creacion) {
                    return res.send('Se ha creado la Raza correctamente')
                } else {
                    return res.send('No se ha creado la Raza')
                }
            })
    } catch (error) {
        return res.send(error.message)
    }

})

router.get('/temperaments', async function (req, res) {
    let limpio = [];

    const existen = await Temperamento.findByPk(1);
    if (existen) {
        await Temperamento.findAll()
            .then((temp) => { return res.send(temp) })
    } else {
        await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then((response) => {
                respuesta = response.data
                let result = respuesta.map(x => { return x.temperament })
                result = result.filter(x => typeof x != "undefined")

                limpio = result.map((element) => { return element.split(",") })
                limpio = limpio.flat();
                limpio = limpio.map((x)=>{return x.trimStart()})
                let dataArr = [...new Set(limpio)];
                try {
                    dataArr.map((string) => { Temperamento.create({ nombre: string }) })
                } catch (error) {
                    console.log(error.messagge)
                }


                return res.send(dataArr)
            })
    }
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
