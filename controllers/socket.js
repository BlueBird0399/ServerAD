const { createServer } = require("http");
const { Server } = require("socket.io");



exports.server=(app)=>{


    const httpServer = createServer(app);

    return httpServer

};
exports.io = (httpServer)=>{
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
    io.on('connection', function (socket) {
        console.log("Connected succesfully to the socket ...");
    
        var news = [
            { title: 'The cure of the Sadness is to play Videogames', date: '04.10.2016' },
            { title: 'Batman saves Racoon City, the Joker is infected once again', date: '05.10.2016' },
            { title: "Deadpool doesn't want to do a third part of the franchise", date: '05.10.2016' },
            { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales', date: '04.10.2016' },
        ];
    
        // Enviar noticias al socket
        socket.emit('news', "hola");
    });
    return io;
}
