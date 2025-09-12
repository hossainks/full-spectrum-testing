const request = require('supertest');
const app = require('../../app');
const mongoose = require("mongoose");
const newBook = require('../mock-data/newBook.json');
const updateBook = require('../mock-data/updateBook.json');

let lastBook;
let nonExistentBookId = "68c2f75bfe7866bd8cdd5c54";
describe('Health check', () => {
  it('GET /health returns 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.Status).toBe('OK');
  });

  it('POST /api/books -> creates a book and returns 201', async () => {
    const res = await request(app).post('/api/books').send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newBook.title);
    expect(res.body.author).toBe(newBook.author);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.year).toBe(newBook.year);
  });
  it('GET /api/books -> returns list of books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0].title).toBeDefined();
    expect(res.body[0]._id).toBeDefined();
    expect(res.body[0].author).toBeDefined();
    expect(res.body[0].year).toBeDefined();
    lastBook = res.body[res.body.length - 1];
  });

  it('GET /api/books/:bookId -> returns a book when found', async () => {
    const res = await request(app).get(`/api/books/${lastBook._id}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.title).toBe(lastBook.title);
  });

  test('GET /api/books/:bookId -> returns 404 when not found', async () => {
    const res = await request(app).get(`/api/books/${nonExistentBookId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Book not found' });
  });

  it('PUT /api/books/:bookId -> updates and returns book when found', async () => {
    const res = await request(app).put('/api/books/' + lastBook._id).send(updateBook);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(updateBook.title);
    expect(res.body.author).toEqual(updateBook.author);
    expect(res.body.year).toEqual(updateBook.year);
  });

  it('PUT /api/books/:bookId -> returns 404 when updating missing book', async () => {
    const res = await request(app).put(`/api/books/${nonExistentBookId}`).send({ title: 'Updated' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Book not found' });
  });

  test('DELETE /api/books/:bookId -> deletes book when found', async () => {
    const res = await request(app).delete(`/api/books/${lastBook._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Book deleted successfully' });
  });

  test('DELETE /api/books/:bookId -> returns 404 when book missing', async () => {
    const res = await request(app).delete(`/api/books/${nonExistentBookId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Book not found' });
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});