const express = require('express');
const app = express();

const PORT = process.env.PORT || 4002;

app.use(express.static('public'));































app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
