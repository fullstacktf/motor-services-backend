import supertest from 'supertest'
import app from '../app.js'
import express from 'express'
const router = express.Router()

describe("Testing User Endpoints",()=>{

    it("Testing to see if Jest work",()=>{
        expect(1).toBe(1)
    })

    
    it("Should return users",()=>{
        supertest(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
        
    })
})