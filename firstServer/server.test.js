const request = require('supertest')
const expect = require('expect.js')
const app = require('./server').app
const fs = require('fs')

const statuses = JSON.parse(fs.readFileSync('statuses.json'));
let id;

describe('Server tests', () => {
  it('Should get all statuses from server (GET /status)', done => {
    request(app)
      .get('/status')
      .expect(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.be.eql(statuses)
      })
      .end(done)
  })

  describe('POST /status and PUT/status/:id testing', () => {
    it('Should add new status (POST /status)', done => {
      const newObj = {name: 'Antay', status: 'learn', object: 'testing'}
      request(app)
        .post('/status')
        .send(newObj)
        .expect(res =>{
          expect(res.body).to.have.keys('name', 'status', 'object')
          statuses.push(res.body)
          id = res.body.id
        })
        .end(done)
    })

    it('Checking that status has added', (done) => {
      request(app)
        .get('/status')
        .expect(res => {
          expect(res.body).to.be.eql(statuses)
        })
        .end(done)
    })

    it('Should update Antay\'s status', done => {
      const newObj = {name: 'Antay', status: 'learn', object: 'testing'}

      request(app)
        .put(`/status/${id}`)
        .send(newObj)
        .expect(res => {
          expect(res.body).to.be.eql({
            ...newObj,
            id
          })
        })
        .end(done)
    })
  })
})