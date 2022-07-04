const HeadOffice = require('../models/HeadOffice');

exports.getAll = async (req, res) => {
    try {
        const headOffices = await HeadOffice.find();
        res.json(headOffices);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las Matrices' });
    }
}

exports.getById = async (req, res) => {
    try {
        const headOffice = await HeadOffice.findById(req.params.id);
        res.json(headOffice);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la Matriz' });
    }
}

exports.save = async (req, res) => {
    try {
        let headOffice = new HeadOffice(req.body);
        await headOffice.save();
        res.json(headOffice);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la Matriz' });
    }
}

exports.update = async (req, res) => {
    try {
        let headOffice = await HeadOffice.findOne(req.params.id);
        if (!headOffice) {
            res.status(500).json({ error: 'No existe la Matriz' });
        }
        headOffice.name = req.body.name;
        headOffice.address = req.body.address;
        headOffice.latitude = req.body.latitude;
        headOffice.longitude = req.body.longitude;

        headOffice = await HeadOffice.findOneAndUpdate({ _id: req.params.id }, headOffice, { new: true });
        res.json(headOffice);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la Matriz' });
    }
}

exports.delete = async (req, res) => {
    try {
        const headOffice = await HeadOffice.findById(req.params.id);
        if (!headOffice) {
            res.status(500).send('No existe la Matriz');
        }
        await HeadOffice.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Matriz eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la Matriz' });
    }
}