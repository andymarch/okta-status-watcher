const ServiceMonitor = require('../serviceMonitor')
const express = require('express')
const router = express.Router()

module.exports = function (serviceMonitor){
    router.get("/", async function(req,res){
        var status = serviceMonitor.getStatus()
        res.status(200).json(status)
    })
    return router
}