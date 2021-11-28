import supertest from 'supertest'
import {app} from '../app.js'
import express from 'express'
const router = express.Router()

describe("Testing Review Endpoints",()=>{

    it("Testing to see if Jest work",()=>{
        expect(1).toBe(1)
    })

    
    it("Should return Reviews from user", async ()=>{
        await supertest(app)
            .get('/reviews')
            .expect('Content-Type', /json/)
            .expect(200)
        
    })
})