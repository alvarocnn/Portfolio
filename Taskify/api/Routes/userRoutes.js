const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asegúrate de importar el modelo

// Obtener usuario por ID
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
//cambiooo
module.exports = router;
