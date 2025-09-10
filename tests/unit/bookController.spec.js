const BookController = require("../../controllers/bookController");
const BookModel = require("../../models/bookModel");
const httpMocks = require("node-mocks-http");
const mockBooks = require("../mock-data/mockBooks.json");

BookModel.create = jest.fn();
BookModel.find = jest.fn();

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
    BookModel.create.mockReturnValue(mockBooks);
    req.body = mockBooks;
    await BookController.createBook(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(mockBooks);
  });

  it('It should return a response body', async () => {
    BookModel.create.mockReturnValue(mockBooks);
    await BookController.createBook(req, res, next);
    expect(res._getJSONData()).toStrictEqual(mockBooks);
  })

  it('It should handle error', async () => {
    const errorMes = { message: 'Something went wrong' };
    const rejectedPromise = Promise.reject(errorMes);
    BookModel.create.mockReturnValue(rejectedPromise);
    await BookController.createBook(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMes);
  })
});

describe("BookController.getBooks", () => {
  it("should call BookModel.find", async () => {
    await BookController.getBooks(req, res, next);
    expect(BookModel.find).toHaveBeenCalled();
  });
});
