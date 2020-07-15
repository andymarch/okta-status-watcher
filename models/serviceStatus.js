exports.ServiceStatus = {
    OPERATIONAL: 'Operational',
    DEGRADED: 'Degraded',
    DISRUPTED: 'Distrupted',
    THIRD_PARTY_IMPACT: 'Third Party Impact',
    UNKNOWN: 'Unknown'
}

exports.fromStatusString = function (string){
    switch(string){
        case "Operational":
            return this.ServiceStatus.OPERATIONAL
        case "Service Degradation":
            return this.ServiceStatus.DEGRADED
        case "Feature Disruption":
            //TODO is this the right mapping
            return this.ServiceStatus.DISRUPTED
        case "Service Disruption":
            return this.ServiceStatus.DISRUPTED
        default:
            return this.ServiceStatus.UNKNOWN
    }
}