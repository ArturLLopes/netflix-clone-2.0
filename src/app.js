const express = require("express");
const path = require("path");

// Função para criar e configurar a aplicação Express
const createApp = () => {
  const app = express();

  // Configuração do diretório de arquivos estáticos
  const publicDirectoryPath = path.resolve(__dirname, "public");
  app.use(express.static(publicDirectoryPath));

  // Rota para o arquivo HTML principal
  app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, "index.html"));
  });

  return app;
};

// Função para iniciar o servidor
const startServer = (port = 3000) => {
  const app = createApp();

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
};

// Exporta as funções para uso externo
module.exports = { createApp, startServer };

// Inicia o servidor diretamente se o arquivo for executado
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  startServer(PORT);
}

