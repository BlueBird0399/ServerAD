const User = require('../models/User');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find().populate('branch');
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los Usuarios' });
    }
}

exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('branch');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el Usuario' });
    }
}

exports.save = async (req, res) => {
    try {
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
        let user = await User.findOne(req.params.id);

        if (!user) {
            res.status(500).json({ error: 'No existe el Usuario' });
        }
        user.branch = req.body.branch.id;
        user.email = req.body.email;
        user.password = req.body.password;
        user.user_type = req.body.branch;

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