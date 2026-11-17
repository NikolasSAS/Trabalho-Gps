const express = require("express");

const app = express();

const PORT = 3000;


// Permite receber JSON
app.use(express.json());


// Permite acessar os arquivos da pasta public
app.use(express.static("public"));


// Guarda a última posição recebida do ESP32
let ultimaPosicao = {
    latitude: null,
    longitude: null,
    timestamp: null
};


// Recebe localização do ESP32
app.post("/api/localizacao", (req, res) => {

    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {

        return res.status(400).json({
            erro: "Latitude ou longitude não informada"
        });

    }


    ultimaPosicao = {

        latitude: Number(latitude),

        longitude: Number(longitude),

        timestamp: new Date().toISOString()

    };


    console.log(
        `GPS recebido: ${ultimaPosicao.latitude}, ${ultimaPosicao.longitude}`
    );


    res.json({
        sucesso: true
    });

});


// Retorna a última localização
app.get("/api/localizacao", (req, res) => {

    res.json(ultimaPosicao);

});


// Inicia servidor
app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});
