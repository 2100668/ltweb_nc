import express from 'express'
import getHomePage from '../controller/HomeController'
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', (req, res) => {
        res.send("ge")
    })
    return app.use('/', router)
}
export default initWebRoute