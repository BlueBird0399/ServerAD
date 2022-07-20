const express = require('express');
const bodyParser = require('body-parser');
const connectionDB = require('./config/db');
const cors = require('cors');

const app = express();

const { createServer } = require("http");
const { Server } = require("socket.io");

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


const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:3000"
    }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/', express.static('node_modules'));

// Manipular conexion
// io.on('connection', async function (socket) {
//     console.log("Connected succesfully to the socket ...");
// });


global.io = io;
const port = process.env.PORT || 3000;
httpServer.listen(port, function () {
    console.log("Listo para empezar")
})