require('dotenv').config()
const express = require('express')

app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function verifyServiceAccess(req,res,next){
    var authz = req.header("Authorization")
    if(authz != null){
        if(authz == process.env.SERVICE_AUTH_SECRET){
        return next();
      }
      else {
        console.log("Service authentication failed.")
        res.status(401).send({message: 'Access denied.'})
      }
    }
    else{
      console.log("Unauthenticated request")
        res.status(401).send({message: 'Access denied.'})
    }
}

var ServiceMonitor = require('./serviceMonitor')
var serviceMonitor = new ServiceMonitor()

var reader = require('./feedReader')
var parser = require('./parser')

var statusRouter = require('./routes/status')(serviceMonitor)
app.use('/status', verifyServiceAccess, statusRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Okta Status Watcher started on '+PORT))
performRefresh()
setInterval(performRefresh, process.env.REFRESH_PERIOD);

function performRefresh() {
    console.log("reading "+process.env.FEED_ENDPOINT)
    reader.performRead()
        .then((events) => {
            parser.performParse(events[0])
            .then((incidents) => {
                for (let index = incidents.length-1; index >= 0; index--) {
                    const element = incidents[index];
                    serviceMonitor.reportIncident(element)
                }
            });
        })
}