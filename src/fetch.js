const fetch = require('node-fetch');

async function fetchFeeds(
    location = 'castlegreen',
    nextPage = btoa(JSON.stringify({
        "post_ts": `${Date.now()}000`,
        "promo_page_data": null,
        "feed_type": "0",
        "ordering_mode": -2
    }))
) {
    const response = await fetch("https://nextdoor.co.uk/api/gql/ContentFromHoodFeed", {
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": "HodRTHdrLVIqMTbLUVt2Vq4aVeRhxUpsnDkSqmiVNh5OFZ3DRmwjkAteSoANyip1",
            "x-nd-activity-id": "5536E3FE-FF5A-496E-9E00-3B3582C5A896",
            "x-nd-activity-source": "no-referrer",
            "x-nd-eid": "",
            "x-nd-lop": "null",
            "cookie": "WE=31721309-e808-406b-a45f-aca229b237c1230619; _gcl_au=1.1.1518266440.1687175995; _pin_unauth=dWlkPU1qRXdOV1k1TnpJdE4yVTROeTAwTVdZMkxXSmlOall0TURFeFpqRmtPVE01T1RjeA; hubspotutk=ebe359433854bdc1a0b8129111e8454a; OptanonAlertBoxClosed=2023-06-19T11:59:59.789Z; g_state={\"i_l\":0}; WE3P=31721309-e808-406b-a45f-aca229b237c1230619; spark-nav-onboarding-completion=Sun%20Jun%2025%202023%2014:40:02%20GMT+0100%20(%E8%8B%B1%E5%9C%8B%E5%A4%8F%E4%BB%A4%E6%99%82%E9%96%93); role-invitation-decline-notification=false; role-resignation-notification=false; __hssrc=1; csrftoken=HodRTHdrLVIqMTbLUVt2Vq4aVeRhxUpsnDkSqmiVNh5OFZ3DRmwjkAteSoANyip1; s=ticv58c38yxrdw9c4tzbvz5522oxkyik; ndbr_at=fONkyWtdDVMfq4VohPDWQIKFd3t9iqte_5jys00cPeI; ndbr_idt=eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1ZGYxZDhmLWZjNTEtNDllZC1hOTMxLWQ0MzkyNWUyMDFiNCIsInR5cCI6IkpXVCJ9.eyJhdF9oYXNoIjoiNlp4dXpGblMyUFR0VVd2akZRbktKUSIsImF1ZCI6WyJuZXh0ZG9vci1kamFuZ28iLCJuZXh0ZG9vciJdLCJleHAiOjE2ODgxMjQ3MTQsImlhdCI6MTY4ODAzODMxNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm5leHRkb29yLmNvbSIsIm5kX3ByYyI6W3siY291bnRyeSI6IkdCIiwicGlkIjoiMTc1OTIyMDQ3NzA4NTkiLCJ1cmwiOiJodHRwczovL3VzZXIubmV4dGRvb3IuY28udWsvdjEvcHJvZmlsZS8xNzU5MjIwNDc3MDg1OSJ9LHsiY291bnRyeSI6IkdCIiwicGlkIjoiMTc1OTIyMDQ4MzQ0NzciLCJ1cmwiOiJodHRwczovL3VzZXIubmV4dGRvb3IuY28udWsvdjEvcHJvZmlsZS8xNzU5MjIwNDgzNDQ3NyJ9XSwic3ViIjoiNDAxNmQ4OWMtNDNjNy00OTA4LTllODEtMjcxMWQ4MDg5MGYwIn0.EluST1TLSpoIv-6U2NeswtROIHBR27U7XkFXy37qVo_QtK_8mNV_wfxebVX3T5aA5mN8_k1SL-v48KRezRSqq_bPxlBx8YX3_LV-hUB5CEfyN2g1tArsxvSbZzeouV1fqKlWQkhEgvnHLqP1Zb1mPDh--leeSA2vFijIxBmVpXj8QUFeleiFyiMtqAX3OTxGoBFxfeDTV4XcubJ9lCEOVGefFfWKhTpsoqcF612l4cWH79Irswb62fntimLQ2e7stHBSJzWDkiE9CxxvYCY2Iy5gMMCo7KImYVejv0mCaR0bItQAXkxNX5Xfk9ZWIa_DThbhnTtLUaPntO7cu57J-A; _gid=GA1.3.2056111007.1688037768; ln_or=eyIzOTUzMDAiOiJkIn0%3D; __hstc=35119166.ebe359433854bdc1a0b8129111e8454a.1687175996005.1687700406579.1688037768802.8; seen-tour-in-past-day=true; WERC=38f4c90e-2d08-4b47-9b14-254588e60f8f2306291688039428; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jun+29+2023+12%3A41%3A16+GMT%2B0100+(%E8%8B%B1%E5%9C%8B%E5%A4%8F%E4%BB%A4%E6%99%82%E9%96%93)&version=202209.2.0&isIABGlobal=false&hosts=&consentId=95a424e7-4f02-448a-8847-86d35db9de1a&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A0%2CC0004%3A0%2CC0002%3A0&geolocation=GB%3BENG&AwaitingReconsent=false; _gat_UA-18585915-1=1; _gat_UA-18585915-20=1; _ga=GA1.1.1975139368.1687175996; _ga_L2ES4MTTT0=GS1.1.1688037767.14.1.1688038877.55.0.0; _ga_HRMXJS2LRC=GS1.1.1688037767.14.1.1688038877.0.0.0; _uetsid=46ac2540166f11eea103b35aeb531c23; _uetvid=ce78ea800e9811eeab698b1830bd94af; __hssc=35119166.4.1688037768802; _dd_s=logs=1&id=b6f93c02-91b3-4d06-b0e1-f70a0325c9c4&created=1688037763567&expire=1688039809805",
            "Referer": "https://nextdoor.co.uk/neighborhood/regentspark--london--england/?source=settings",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify({
            "operationName": "ContentFromHoodFeed",
            "variables": {
                "pagedCommentsMode": "FEED",
                "facepileArgs": {
                    "variant": "TRIMMED"
                },
                "slug": location,
                "timeZone": "Asia/Taipei",
                "input": {
                    "pageSize": 10,
                    "supportedFeatures": {
                        "isNMARollupEnabled": true,
                        "rollupItemTypes": [
                            "LIST_CARD",
                            "IMAGE_CARD"
                        ],
                        "rollupTypes": [
                            "CAROUSEL",
                            "LIST"
                        ]
                    },
                    "feedRequestId": "828B1D21-8AA6-4766-A181-77107AC50677",
                    "nextPage": nextPage,
                }
            },
            "extensions": {
                "persistedQuery": {
                    "version": 1,
                    "sha256Hash": "5c02fb4ab23f0f6e44834488783c478190825019a659bd5853dda9c32439e0cb"
                }
            }
        }),
        "method": "POST"
    });
    return await response.json();
}

module.exports = {
    fetchFeeds,
};
