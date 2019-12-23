require("dotenv").config();
const express       = require('express');
const mongoose      = require("mongoose");
const bookRoutes    = require("./routes/booksRoute");
const noteRoutes    = require("./routes/notesRoute");
const app           = express();

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log("Database Connection Error! ", err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', bookRoutes);
app.use('/notes', noteRoutes);

if (process.env.NODE_ENV === 'development') {
    app.listen(process.env.PORT, () => {
    console.log(`Auth service listening on port ${process.env.PORT}!`);
})
} else {
    const server = awsServerlessExpress.createServer(app);
    module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
}