import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import template from './template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'
import customerRoutes from './routes/customer.routes'

const swaggerUI = require("swagger-ui-express");
const swaggerFile = require('./swagger_output.json')

const app=express()

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ['./routes/*.js'],
};


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/',userRoutes)
app.use('/',authRoutes)
app.use('/',productRoutes)
app.use('/',customerRoutes)

app.get('/',(req,res)=>{
    res.status(200).send(template())
})


export default app