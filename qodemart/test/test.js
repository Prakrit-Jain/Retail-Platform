import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
describe('GET /user', () => {
  it('should return all users', (done) => {
    chai
      .request(app)
      .get('/user')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('Customer Profile API', () => {
  it('should return customer profile data for customerId 1', (done) => {
    chai.request('localhost:3000')
      .get('/customer/profile?customerId=1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.customerId).to.equal(1);
        expect(res.body.name).to.be.a('string');
        expect(res.body.email).to.be.a('string');
        expect(res.body.address).to.be.a('string');
        done();
      });
  });

  it('should return a 404 status code for an invalid customerId', (done) => {
    chai.request('localhost:3000')
      .get('/customer/profile?customerId=123')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('User Login API', () => {
  it('should return a JWT token on successful login', (done) => {
    chai.request('http://localhost:3000')
      .post('/user/login')
      .send({ email: 'prakrit@gmail.com', password: '1234' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.token).to.be.a('string');

        // Verify the JWT token
        const decodedToken = jwt.verify(res.body.token, 'TaRaRamPamPam');
        done();
      });
  });
});

describe('POST /user', () => {
  it('should return status code 201 and a success message on successful creation', (done) => {
    //
    chai.request(app).post('/user').send({
      fullName: 'PrakritJain',
      email: 'prakrit@gmail.com',
      phoneNumber: 476221123,
      gender: 'Male',
      role: 'Seller',
      password: '1234',
    });
  }, (err, res) => {
    expect(res.status).to.equal(201);
  });
  done;
});
