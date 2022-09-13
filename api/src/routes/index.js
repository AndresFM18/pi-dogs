const { Router } = require('express');
const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
const { Temperamento, Raza, Raza_Temp } = require('../db');
const {Op} = require('sequelize')
const urlbase = "https://cdn2.thedogapi.com/images/"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.get('/dogs', async function (req, res) {
    const nombres = req.query.nombres;
    let respuesta = [];
    const existen = await Raza.findByPk(1);

    if (nombres) {   
        await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nombres}&apiKey=${API_KEY}`)
            .then((response) => { respuesta = response.data })
            .then(() => {
                if (respuesta[0] == undefined) {
                    return res.send('no hay resultados para la busqueda')
                } else {
                    let arreglo = respuesta.map((x) => { return { id: x.id, nombre: x.name, peso: x.weight.metric, imagen:`${urlbase}${x.reference_image_id}.jpg`, alttemperamentos:x.temperament, altura:x.height.metric, edad:x.life_span } })
                    return res.send(arreglo)
                }
            })
            return "xd"
    }

    if (existen) {
        try {
             await Raza.findAll({include: Temperamento})
            .then((razas) => { return res.send(razas) })
        } catch (error) {
         return res.send(error.message)  
        }
       
    } else {

        try {
            await axios.get(`https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`)
            .then(async (response) => {
                respuesta = response.data
                respaldo = respuesta
                

                for (let i = 0; i < respuesta.length; i++) {
                  let razanew =  await Raza.create({
                    id: respuesta[i].id,
                    nombre: respuesta[i].name,
                    altura: respuesta[i].height.metric,
                    peso: respuesta[i].weight.metric,
                    edad: respuesta[i].life_span,
                    imagen: respuesta[i].image.url
                  })
                  var desorden = respuesta[i].temperament
                  if(desorden === undefined){
                    desorden = 'NOTEMPERAMENTS'
                  }
                  var orden = desorden.split(",");
                  orden = orden.map((x)=>{return x.trim()})
                  //console.log(orden)
                  let tempi = [];

                  for (let x = 0; x < orden.length; x++) {
                       await Temperamento.findAll({
                          where: { nombre: orden[x] }
                      })
                        .then((temp) => { tempi[x] = temp[0].dataValues.id })
                       
                  }

                  tempi.map(async (tempid) => {
                    await Raza_Temp.create({
                        razaId: razanew.id,
                        temperamentoId: tempid
                    })
                })
                }
                return res.send(respaldo)
            })

        } catch (error) {
            return res.send(error.message)
        }
       
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
        try {
            await Raza.findByPk(Number_id, {
                include: Temperamento,
            })
                .then((razad) => {
                    if (razad == null) {
                        return res.send('No existe')
                    }
                    return res.send(razad);
                })
        } catch (error) {
            return res.send(error.message);
        }
    //  else {
    //     await axios.get(`https://api.thedogapi.com/v1/breeds`)
    //         .then((response) => { respuesta = response.data })
    //         .then(() => {
    //             let arreglo = respuesta.filter(x => x.id == id)
    //             if (arreglo[0] == undefined) {
    //                 return res.send('este id no existe')
    //             }
    //             return res.send(arreglo)
    //         })
    // }





})

router.post('/dogs', async function (req, res) {

    const { nombre, peso1, peso2, altura1, altura2, edad1, edad2, imagen} = req.body;

    let peso = `${peso1} - ${peso2}`
    let altura = `${altura1} - ${altura2}`
    let edad = `${edad1} - ${edad2}`
    let PesoNumber1 = Number(peso1);
    let PesoNumber2 = Number(peso2);
    let AlturaNumber1 = Number(altura1);
    let AlturaNumber2 = Number(altura2);
    let EdadNumber1 = Number(edad1);
    let EdadNumber2 = Number(edad2);

    try {
        if (typeof nombre != 'string') {
            return res.send('El nombre deber ser una string')
        }
        if (isNaN(PesoNumber1) || isNaN(PesoNumber2)) {
            return res.send('El peso debe ser un numero')
        }
        if (isNaN(AlturaNumber1 || isNaN(AlturaNumber2))) {
            return res.send('La altura debe ser un numero')
        }
        if (isNaN(EdadNumber1) || isNaN(EdadNumber2)) {
            return res.send('La edad debe ser un numero')
        }
    } catch (error) {
        return res.send(error.message)
    }

    try {
        await Raza.create({
            nombre: nombre,
            altura: altura,
            peso: peso,
            edad: edad,
            imagen: imagen
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
                limpio = limpio.map((x) => { return x.trimStart() })
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


router.post("/dogs2", async function (req, res) {

    const { imagen,nombre, peso1, peso2, temperamento, altura1, altura2, edad2, edad1 } = req.body;

    let peso = `${peso1} - ${peso2}`
    let altura = `${altura1} - ${altura2}`
    let edad = `${edad1} - ${edad2}`
    let PesoNumber1 = Number(peso1);
    let PesoNumber2 = Number(peso2);
    let AlturaNumber1 = Number(altura1);
    let AlturaNumber2 = Number(altura2);
    let EdadNumber1 = Number(edad1);
    let EdadNumber2 = Number(edad2);

    try {
        if (typeof nombre != 'string') {
            return res.send('El nombre deber ser una string')
        }
        if (isNaN(PesoNumber1) || isNaN(PesoNumber2)) {
            return res.send('El peso debe ser un numero')
        }
        if (isNaN(AlturaNumber1 || isNaN(AlturaNumber2))) {
            return res.send('La altura debe ser un numero')
        }
        if (isNaN(EdadNumber1) || isNaN(EdadNumber2)) {
            return res.send('La edad debe ser un numero')
        }
    } catch (error) {
        return res.send(error.message)
    }

    try {

        const razanew = await Raza.create({
            nombre: nombre,
            altura: altura,
            peso: peso,
            edad: edad,
            imagen:imagen
        });

        let tempi = [];

        for (let x = 0; x < temperamento.length; x++) {
            await Temperamento.findAll({
                where: { nombre: temperamento[x] }
            })
                .then((temp) => { tempi[x] = temp[0].dataValues.id })
        }

        tempi.map(async (tempid) => {
            await Raza_Temp.create({
                razaId: razanew.id,
                temperamentoId: tempid
            })
        })

        //let pipe = await Raza.findAll({ include: Temperamento })
        return res.send('Se ha creado la Raza correctamente')
    } catch (error) {
        return console.log(error.message)
    }

})

router.get('/database', async function (req, res) {
    try {
        await Raza.findAll({where:{id :{[Op.gt]: 264,}} , include: Temperamento})
            .then((razas) => { return res.send(razas) })
    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/apicall/:length', async function (req, res) {
    let length = req.params.length
   
    
    try {
        await Raza.findAll({where:{id:{[Op.lte]:length}},include: Temperamento})
            .then((response) => {
                return res.send(response)
            })
    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/apisort', async function(req,res){
try {
    await Raza.findAll({where:{id:{[Op.lt]: 200}}, include: Temperamento})
    .then((response)=>{
        return res.send(response)
    })
} catch (error) {
    return res.send(error.message)
}
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
