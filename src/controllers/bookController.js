import Book from "../models/Book.js";

// =======================
// Create Book
// =======================
export const createBook = async (req, res, next) => {
  try {
    const { title, author, status } = req.body;

    const book = await Book.create({
      title,
      author,
      status,
      userId: req.user._id, // relasi ke user login
    });

    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      book,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Get All Books (user)
// =======================
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ userId: req.user._id });

    res.status(200).json(books);
  } catch (error) {
    next(error)
  }
};

// =======================
// Get Book By ID
// =======================
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// =======================
// Update Book
// =======================
export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.status(200).json({
      message: "Buku berhasil diperbarui",
      book,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Delete Book
// =======================
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.status(200).json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};
