const StatusAlertModel = require('./models/statusAlertModel')
let Parser = require('rss-parser');
let parser = new Parser();

exports.performRead = async ()=> {
    let feed = await parser.parseURL(process.env.FEED_ENDPOINT);
    var events = []
    feed.items.forEach(item => {
        events.push(new StatusAlertModel(item))
    });
    return events
}