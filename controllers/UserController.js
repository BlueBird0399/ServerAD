const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find().populate({ path: 'company', populate: { path: 'headOffice' } });
        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los Usuarios' });
    }
}

exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({ path: 'company', populate: { path: 'headOffice' } });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el Usuario' });
    }
}

exports.save = async (req, res) => {
    try {
        req.body.company = req.body.company.id;
        req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(12));
        let user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar el Usuario' });
    }
}

exports.update = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(500).json({ error: 'No existe el Usuario' });
        }
        user.company = req.body.company;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        if(req.body.password != null) user.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(12));
        user.user_type = req.body.user_type;

        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el Usuario' });
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(500).send('No existe el Usuario');
        }
        await User.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el Usuario' });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate({ path: 'company', populate: { path: 'headOffice' } });
        if (!user) {
            res.status(500).json({ error: 'No se encontró el usuario' });
        }

        bcryptjs.compare(req.body.password, user.password).then((compare) => {
            if (compare) {
                res.json(user)
            }
            else
                res.status(500).json({ error: 'Contraseña incorrecta' });
        });
    } catch (error) {

    }
}