
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.use((req, res) =>
    res.sendFile(path.join(__dirname, "client/public/index.html")))

app.listen(PORT, () => console.log("Listening on PORT: " + PORT))