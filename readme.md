# Okta Status Monitor

---
**WARNING**

This is a proof of concept. It is intended as a reference, attach business
critical processes to this at your own risk.
The recommended process is to read the RSS feed.

---

## Setup

Create a .env file with the following properties

```
FEED_ENDPOINT=http://feeds.feedburner.com/OktaTrustRSS
REFRESH_PERIOD=300000
PORT=5000
SERVICE_AUTH_SECRET=imsecret

```

FEED_ENDPOINT is the okta rss feed to monitor
REFRESH_PERIOD is how often this rss feed is retrived (default 5 mins)
PORT determines where on your host the service runs
SERVICE_AUTH_SECRET is the value you must place in the authorization header to
be authenticated to the service.


# What is this doing?

Reading the Okta status RSS feed periodically and retrieving each reported
event. This then requests the linked page. This page before render contains a
JSON representation of the incident data. This is then parsed and a global
service status is set this is retrievable via a call to the service.

# How do I call this service

Currently only one endpoint is exposed /status a GET call to this endpoint with
the Authorization value will return the service status object

```
curl --location --request GET 'localhost:5000/status' \
--header 'Authorization: imsecret'
```

```
{
    "overall": {
        "serviceName": "Okta Services",
        "status": "Operational"
    },
    "corePlatform": {
        "serviceName": "Core Platform",
        "status": "Operational"
    },
    "advancedServerAccess": {
        "serviceName": "Advanced Server Access",
        "status": "Operational"
    },
    "apiServices": {
        "serviceName": "API Services",
        "status": "Operational"
    },
    "mfa": {
        "serviceName": "MFA",
        "status": "Operational"
    },
    "sso": {
        "serviceName": "SSO",
        "status": "Operational"
    },
    "workflows": {
        "serviceName": "Workflows",
        "status": "Operational"
    },
    "thirdParty": {
        "serviceName": "Third Party",
        "status": "Operational"
    }
}
```