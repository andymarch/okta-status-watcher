class StatusAlert {
    constructor(rssObject) {
        if(rssObject){
            try {
                this.indidentId = rssObject.id.replace("https://www.salesforce.com/", "");
                this.title = rssObject.title
                this.link = rssObject.link
                this.dateTime = rssObject.pubDate
                this.snippet = rssObject.contentSnippet                
                //other values content and isoDate
            }
            catch (error){
                console.log(error)
            }
        }
    }
}

module.exports = StatusAlert