class IncidentModel {
    constructor(jsonObj) {
        if(jsonObj){
            try {
                this.indidentId = jsonObj.Id
                this.status = jsonObj.Status__c
                this.last_update = jsonObj.Last_Updated__c

                this.category = jsonObj.Category__c
                this.size = jsonObj.Size__c  

                this.impactedCells = jsonObj.Impacted_Cells__c
                this.impactedFeature = jsonObj.Service_Feature__c     
                this.subService = jsonObj.Okta_Sub_Service__c
                this.audience = jsonObj.Impacted_Audience__c   
                 
                this.start = jsonObj.Start_Date__c,
                this.end = jsonObj.End_Date__c,
                this.duration = jsonObj.Duration__c

                this.message = jsonObj.Log__c  
            }
            catch (error){
                console.log(error)
            }
        }
    }
}

module.exports = IncidentModel