import request from 'supertest'
import app from '../../app'

test('Should sign up for a user', async () => {
    await request(app).post('/register')
        .send({
            "username": "admin",
            "password": "password@",
            "name": "supper admin"
        })
        .expect(200)
})
