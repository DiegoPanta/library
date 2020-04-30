const mongoose = require("mongoose");

const Book = require("../models/book");

exports.books_get_all = (req, res, next) => {
    Book.find()
    .select("read author genre title _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        books: docs.map((doc) => {
          return {
            read: doc.title,
            author: doc.author,
            genre: doc.genre,
            title: doc.title,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/books/" + doc._id,
            },
          };
        }),
      };
      //   if(docs.length >= 0){
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.books_post_create = (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    genre: req.body.genre,
    author: req.body.author,
    read: req.body.read,
  });
  book
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created book successfully",
        createdBook: {
          read: result.title,
          author: result.author,
          genre: result.genre,
          title: result.title,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/books/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.books_get_byId = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .select("read author genre title _id")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          book: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/books"
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.books_patch_byId = (req, res, next) => {
  const id = req.params.bookId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Book.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
          message: 'Book updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/books/' + id
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.books_delete_byId = (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
          message: 'Book deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/books/' + id,
              body: {  
                title: 'String', 
                genre: 'String', 
                author: 'String', 
                read: 'Boolean'
            }
          }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
