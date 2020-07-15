
const axios = require('axios')
const StatusAlertModel = require('./models/statusAlertModel')
const parser = require('node-html-parser')
const IncidentModel = require('./models/incidentModel')

exports.performParse = async (statusAlertModel)=> {
    var response = await axios.get(statusAlertModel.link)
    var parsed = parser.parse(response.data)

    var data = JSON.parse(parsed.querySelector('#j_id0:j_id9:StringJSON').innerHTML)

    for (let el of data) {
        var incident = new IncidentModel(el)
        if (statusAlertModel.indidentId == incident.indidentId){
            return incident
        }
    }
    console.log("No matching issue for '"+statusAlertModel.indidentId+"'")

    return null
}