const express = require('express');
const bodyParser = require('body-parser');
const connectionDB = require('./config/db');
const cors = require('cors');

const app = express();

// Conexión BD
connectionDB();

// Habilitar Cors
app.use(cors());

// Habilitar bodyparser (leer formulario)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", require("./routes/app.routes"));

// Empresa
app.use("/api/company", require("./routes/CompanyRoutes"));

// Usuarios
app.use("/api/user", require("./routes/UserRoutes"));

//Notificaciones
app.use("/api/notification", require("./routes/NotificationRoutes"));

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listo para empezar")
})