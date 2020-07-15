const ServiceModel = require('./models/serviceModel')
const ServiceStatus = require('./models/serviceStatus')


class ServiceMonitor {
    constructor() {
        this.oktaServices = new ServiceModel("Okta Services", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.corePlatform = new ServiceModel("Core Platform", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.advancedServerAccess = new ServiceModel("Advanced Server Access", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.apiServices = new ServiceModel("API Services", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.mfa = new ServiceModel("MFA", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.sso = new ServiceModel("SSO", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.workflows = new ServiceModel("Workflows", ServiceStatus.ServiceStatus.OPERATIONAL)
        this.thirdParty = new ServiceModel("Third Party", ServiceStatus.ServiceStatus.OPERATIONAL)
    }

    reportIncident(incident){
        console.log("An incident was reported")
        //TODO are we already tracking this incident?
        //if yes update to handle resolved
        //TODO handle simulaneous incidents
        if(incident.status != "Resolved"){
            this.oktaServices.status = ServiceStatus.fromStatusString(incident.category)
            switch(incident.impactedFeature){
                case "Core Service":
                    console.log("Incident with Core Service")
                    this.corePlatform.status = ServiceStatus.fromStatusString(incident.category)
            }
        }
        else{
            //TODO handle incident resolution
        }
    }

    getStatus(){
        //TODO handle impacted cells
        return {
            overall: this.oktaServices,
            corePlatform: this.corePlatform,
            advancedServerAccess: this.advancedServerAccess,
            apiServices: this.apiServices,
            mfa: this.mfa,
            sso: this.sso,
            workflows: this.workflows,
            thirdParty: this.thirdParty
        }
    }   
}

module.exports = ServiceMonitor