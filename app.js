const  express = require("express");
const path = require("path");

const app = express();


app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(path.join(__dirname, "public")));



app.get(/\/.*\.html/, function(req, res) {
    var filePath = path.join(app.get('views'), req.path);
    fs.exists(filePath, function(exists){
        if(!exists){
            res.send(404, "Not Found");
        };
        res.sendFile(filePath);
    });
});

module.exports = app;



