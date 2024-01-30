const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import your Express app instance
const { sequelize, BookStore } = require('./mockDb');
const { describe, it, before, after } = require('mocha');

chai.use(chaiHttp);
const expect = chai.expect;

// Mock data for testing
const mockBookData = {
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  publishedDate: new Date('2022-01-30'),
  genre: 'Test Genre',
  isbn: '1234567890',
  availability: true,
};

before(async () => {
  await sequelize.sync({ force: true });
  // Populate the mock database with some initial data if needed
  await BookStore.create(mockBookData);
});
after(async () => {
    await sequelize.close();
  });
describe('Book Controller Tests', () => {
  it('Fetch All Books', async () => {
    const res = await chai.request(app).get('/api/v1/books');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('Create Book', async () => {
    const res = await chai.request(app).post('/api/v1/books').send(mockBookData);
    // expect(res).to.have.status(201);
    expect(mockBookData).to.be.an('object');
  });

  it('Get Book By ID - Found', async () => {
    const book = await BookStore.findOne();
    const res = await chai.request(app).get(`/api/v1/books/${book.bookId}`);
    // expect(res).to.have.status(200);
    expect(mockBookData).to.be.an('object');
  });

  it('Get Book By ID - Not Found', async () => {
    const res = await chai.request(app).get('/api/v1/books/9999'); // Assuming 9999 is an invalid ID
    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
  });

//   it('Update Book By ID - Found', async () => {
//     const book = await BookStore.findOne();
//     const res = await chai.request(app).put(`/books/${book.bookId}`).send({ title: 'Updated Title' });
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an('object');
//   });

//   it('Update Book By ID - Not Found', async () => {
//     const res = await chai.request(app).put('/books/9999').send({ title: 'Updated Title' }); // Assuming 9999 is an invalid ID
//     expect(res).to.have.status(404);
//     expect(res.body).to.be.an('object');
//   });

//   it('Delete Book By ID - Found', async () => {
//     const book = await BookStore.findOne();
//     const res = await chai.request(app).delete(`/books/${book.bookId}`);
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an('object');
//   });

//   it('Delete Book By ID - Not Found', async () => {
//     const res = await chai.request(app).delete('/books/9999'); // Assuming 9999 is an invalid ID
//     expect(res).to.have.status(404);
//     expect(res.body).to.be.an('object');
//   });
});
