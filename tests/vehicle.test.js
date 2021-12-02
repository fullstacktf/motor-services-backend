import supertest from 'supertest'
import {app} from '../app.js'
import express from 'express'
const router = express.Router()



describe("Testing Vehicle Endpoints",()=>{

    it("Testing to see if Jest work",()=>{
        expect(1).toBe(1)
    })

    
    it("Should return vehicles from user",()=>{
        supertest(app)
            .get('/me/vehicles')
            .expect('Content-Type', /json/)
            .expect(200)
        
    })

    it("Should return one vehicle from user",()=>{
        supertest(app)
            .get('/me/vehicles/:idVehicle')
            .expect('Content-Type', /json/)
            .expect(200)
          
    })


})

