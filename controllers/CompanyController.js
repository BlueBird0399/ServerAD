const Company = require('../models/Company');

exports.getAll = async (req, res) => {
    try {
        const companies = await Company.find().populate('headOffice');
        res.json(companies);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las Sucursales' });
    }
}

exports.getById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('headOffice');
        res.json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la Sucursal' });
    }
}

exports.save = async (req, res) => {
    try {
        let company = new Company(req.body);
        await company.save();
        res.json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la Sucursal' });
    }
}

exports.update = async (req, res) => {
    try {
        let company = await Company.findById(req.params.id);
        if (!company) {
            res.status(500).json({ error: 'No existe la Sucursal' });
        }
        company.headOffice = req.body.headOffice.id;
        company.name = req.body.name;
        company.address = req.body.address;
        company.contact = req.body.contact;
        company.latitude = req.body.latitude;
        company.longitude = req.body.longitude;
        company = await Company.findOneAndUpdate({ _id: req.params.id }, company, { new: true });
        res.json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la Sucursal' });
    }
}

exports.delete = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            res.status(500).send('No existe la Sucursal');
        }
        await Company.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Sucursal eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la Sucursal' });
    }
}
