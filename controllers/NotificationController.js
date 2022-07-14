const Notification = require('../models/Notification');

exports.getAll = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('user');
        res.json(notifications);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las Notificaciones' });
    }
}

exports.getById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id).populate('user');
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la Notificación' });
    }
}

exports.save = async (req, res) => {
    try {
        let notification = new Notification(req.body);
        await notification.save();
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la Notificación' });
    }
}

exports.update = async (req, res) => {
    try {
        let notification = await Notification.findById(req.params.id);
        if (!notification) {
            res.status(500).json({ error: 'No existe la Notificación' });
        }
        notification.user = req.body.user.id;
        notification.message = req.body.message;
        notification.date = req.body.date;

        notification = await Notification.findOneAndUpdate({ _id: req.params.id }, notification, { new: true });
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la Notificación' });
    }
}

exports.delete = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            res.status(500).send('No existe la Notificación');
        }
        await Notification.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Notificación eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la Notificación' });
    }
}