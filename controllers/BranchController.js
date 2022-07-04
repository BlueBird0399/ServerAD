const Branch = require('../models/Branch');

exports.getAll = async (req, res) => {
    try {
        const branches = await Branch.find().populate('headOffice');
        res.json(branches);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las Sucursales' });
    }
}

exports.getById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id).populate('headOffice');
        res.json(branch);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la Sucursal' });
    }
}

exports.save = async (req, res) => {
    try {
        let branch = new Branch(req.body);
        await branch.save();
        res.json(branch);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la Sucursal' });
    }
}

exports.update = async (req, res) => {
    try {
        let branch = await Branch.findOne(req.params.id);
        if (!branch) {
            res.status(500).json({ error: 'No existe la Sucursal' });
        }
        branch.headOffice = req.body.headOffice.id;
        branch.name = req.body.name;
        branch.address = req.body.address;
        branch.contact = req.body.contact;
        branch.latitude = req.body.latitude;
        branch.longitude = req.body.longitude;
        branch = await Branch.findOneAndUpdate({ _id: req.params.id }, branch, { new: true });
        res.json(branch);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la Sucursal' });
    }
}

exports.delete = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            res.status(500).send('No existe la Sucursal');
        }
        await Branch.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Sucursal eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la Sucursal' });
    }
}
