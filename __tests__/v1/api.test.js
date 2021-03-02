import request from 'supertest'
import app from '../../src/app'

test('Should sign up for a user', async () => {
    await request(app).post('/register')
        .send({
            "username": "admin" + new Date().getTime(),
            "password": "password@",
            "name": "supper admin"
        })
        .expect(200)
})
