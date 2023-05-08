const express = require("express");
const User = require("../models/user.model");
const fs = require('fs');

const router = express.Router();

//Total de usuarios
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Usuario por id
router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});

// Crear un usuario
router.post("/", async (req, res) => {
    const user = new User(req.body.user);

    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const user = req.body.user;
    const id = user._id;

    try {
        await User.updateOne({ _id: id }, {
            $set: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                documentNumber: user.documentNumber,
                documentType: user.documentType,
                phoneNumber: user.phoneNumber,
                birthdate: user.birthdate,
                expeditionDate: user.expeditionDate,
                country: user.country,
                city: user.city,
                address: user.address,
                /* birthdate: user.img, */
            }
        });

        res.status(200).json({ message: req.body.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/upload/:id', async (req, res) => {

    const id = req.params.id;

    let base64data = req.body.img;
    let fileName = `${req.params.id}.jpg`;
    let filePath = `./uploads/images/usersprofilepics/${fileName}`;

    if (!base64data) {
        console.error('La imagen está vacía');
        res.status(400).send('La imagen está vacía');
        return;
    }

    let imageBuffer = Buffer.from(base64data, 'base64')

    fs.writeFile(filePath, imageBuffer, (err) => {
        if (err) {
            console.error('Error al guardar la imagen', err);
            res.status(500).send('Error al guardar la imagen');
        } else {
            //console.log(`Imagen guardada correctamente en ${filePath}`);
        }
    });
    
    try {
        await User.updateOne({ _id: id }, {
            $set: {
                photoProfile: fileName,
            }
        });
        res.status(200).json('Imagen recibida y guardada correctamente');
    } catch (err) {
        //console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Eliminar usuario
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Buscar usuario por id
async function getUser(req, res, next) {
    let user;

    try {
        user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: "Ususario no encontrado" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
}

// Buscar usuario por correo
async function getUser(req, res, next) {
    let user;

    try {
        user = await User.findOne({email: req.body.user.email});

        if (user == null) {
            return res.status(404).json({ message: "Ususario no encontrado" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
}

module.exports = router;