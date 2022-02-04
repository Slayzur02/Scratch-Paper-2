const mongoose = require("mongoose");
const Document = require("./Document");

var express = require('express')
var app = express()
var server = require('http').createServer(app)



// respond with "hello world" when a GET request is made to the homepage
app.get('/what-the-fuck', function (req, res) {
  res.send('hello world')
})

const uri = "mongodb+srv://me-0:edoJeprOdqgUnoVe@testcluster.uvpqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "Begin typing here...";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data:   defaultValue });
}

server.listen(process.env.PORT || 5000)
