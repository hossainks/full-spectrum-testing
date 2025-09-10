const BookController = require("../../controllers/bookController");
const BookModel = require("../../models/bookModel");
const httpMocks = require("node-mocks-http");
const mockBooks = require("../mock-data/mockBooks.json");

BookModel.create = jest.fn();
BookModel.find = jest.fn();
BookModel.findById = jest.fn();
BookModel.findByIdAndUpdate = jest.fn();
BookModel.findByIdAndDelete = jest.fn();

// jest.mock("../../models/bookModel");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("BookController.createBook", () => {
  it("should have a createBook function", () => {
    expect(typeof BookController.createBook).toBe("function");
  });

  it("should call BookModel.create", async () => {
    req.body = mockBooks;
    await BookController.createBook(req, res, next);
    expect(BookModel.create).toHaveBeenCalledWith(mockBooks);
  });

  it("should return 201 response code", async () => {
    await BookController.createBook(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('It should return a response body', async () => {
    BookModel.create.mockResolvedValue(mockBooks);
    await BookController.createBook(req, res, next);
    expect(res._getJSONData()).toStrictEqual(mockBooks);
  })

  it('It should handle error', async () => {
    const errorMes = { message: 'Something went wrong' };
    BookModel.create.mockRejectedValue(errorMes);
    await BookController.createBook(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMes);
  })
});

describe("BookController.getBooks", () => {
  it("should have a getBooks function", () => {
    expect(typeof BookController.getBooks).toBe("function");
  });

  it("should call BookModel.find", async () => {
    await BookController.getBooks(req, res, next);
    expect(BookModel.find).toHaveBeenCalled();
  });

  it("should return 200 and the books", async () => {
    const books = [mockBooks];
    BookModel.find.mockReturnValue(books);
    await BookController.getBooks(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(books);
  });

  it("should call next with error when model throws", async () => {
    const error = { message: "DB error" };
    BookModel.find.mockRejectedValue(error);
    await BookController.getBooks(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("BookController.getBookById", () => {
  it("should have a getBookById function", () => {
    expect(typeof BookController.getBookById).toBe("function");
  });

  it("should call BookModel.findById with route parameter", async () => {
    req.params.bookId = "1";
    await BookController.getBookById(req, res, next);
    expect(BookModel.findById).toHaveBeenCalledWith("1");
  });

  it("should return 200 and the book when found", async () => {
    const book = mockBooks;
    BookModel.findById.mockResolvedValue(book);
    req.params.bookId = "1";
    await BookController.getBookById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(book);
  });

  it("should return 404 when book not found", async () => {
    BookModel.findById.mockResolvedValue(null);
    req.params.bookId = "nonexistent";
    await BookController.getBookById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({ message: "Book not found" });
  });

  it("should call next with error when model throws", async () => {
    const error = { message: "DB error" };
    BookModel.findById.mockRejectedValue(error);
    req.params.bookId = "1";
    await BookController.getBookById(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("BookController.updateBook", () => {
  it("should have an updateBook function", () => {
    expect(typeof BookController.updateBook).toBe("function");
  });

  it("should call BookModel.findByIdAndUpdate with params and body", async () => {
    req.params.bookId = "1";
    req.body = { title: "Updated" };
    await BookController.updateBook(req, res, next);
    expect(BookModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { title: "Updated" },
      { new: true }
    );
  });

  it("should return 200 and updated book when found", async () => {
    const updated = { ...mockBooks, title: "Updated" };
    BookModel.findByIdAndUpdate.mockResolvedValue(updated);
    req.params.bookId = "1";
    req.body = { title: "Updated" };
    await BookController.updateBook(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updated);
  });

  it("should return 404 when update target not found", async () => {
    BookModel.findByIdAndUpdate.mockResolvedValue(null);
    req.params.bookId = "doesnotexist";
    req.body = { title: "Updated" };
    await BookController.updateBook(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({ message: "Book not found" });
  });

  it("should call next with error when model throws", async () => {
    const error = { message: "Update error" };
    BookModel.findByIdAndUpdate.mockRejectedValue(error);
    req.params.bookId = "1";
    req.body = { title: "Updated" };
    await BookController.updateBook(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("BookController.deleteBook", () => {
  it("should have a deleteBook function", () => {
    expect(typeof BookController.deleteBook).toBe("function");
  });

  it("should call BookModel.findByIdAndDelete with route parameter", async () => {
    req.params.bookId = "1";
    await BookController.deleteBook(req, res, next);
    expect(BookModel.findByIdAndDelete).toHaveBeenCalledWith("1");
  });

  it("should return 200 when deletion succeeds", async () => {
    BookModel.findByIdAndDelete.mockResolvedValue({});
    req.params.bookId = "1";
    await BookController.deleteBook(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({ message: "Book deleted successfully" });
  });

  it("should return 404 when book to delete is not found", async () => {
    BookModel.findByIdAndDelete.mockResolvedValue(null);
    req.params.bookId = "nope";
    await BookController.deleteBook(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toStrictEqual({ message: "Book not found" });
  });

  it("should call next with error when model throws", async () => {
    const error = { message: "Delete error" };
    BookModel.findByIdAndDelete.mockRejectedValue(error);
    req.params.bookId = "1";
    await BookController.deleteBook(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
