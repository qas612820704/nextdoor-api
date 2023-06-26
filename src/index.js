const fetch = require('node-fetch');
const fs = require('fs');
const { unparse } = require('papaparse');

const url = 'https://nextdoor.co.uk/neighborhood/castlegreen--kenilworth--england';
const size = 10;

main();
async function main() {
    const location = url.split('--').shift().split('/').pop();

    const rawFeeds = [];
    const feeds = [];
    let result;
    for (let i = 0; i < size; i++) {
        const nextPage = result?.data?.neighborhood?.contentFromHoodFeed?.nextPage;
        result = await fetchFeeds(location, nextPage);
        const feedItems = result?.data?.neighborhood?.contentFromHoodFeed?.feedItems || [];
        feeds.push(...feedItems.map(item => {
            return {
                id: item?.post?.id,
                subject: item?.post?.subject,
                body: item?.post?.body,
                hash_tags: item?.post?.hashtags.map(tag => tag?.text).join(' '),
                author: item?.post?.author?.displayName,
                date: new Date(+item?.post?.createdAt?.epochMillis).toISOString(),
                location,
            }
        }));
        rawFeeds.push(feedItems);
    }

    fs.writeFileSync(`${location}.json`, JSON.stringify(feeds, null, 2));
    fs.writeFileSync(`${location}.raw.json`, JSON.stringify(rawFeeds, null, 2));
    fs.writeFileSync(`${location}.csv`, unparse(feeds));
}

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
            "content-type": "application/json",
            "x-csrftoken": "hsBkarOr4CfOmpoyS6iVP08PuMmY96Cqrdq5bmnEU7N04rV1tuiHizZdMeupVjhb",
            "cookie": "WE=dce96011-a345-439e-b1cd-99dd15ed4341230619; _gcl_au=1.1.1766645539.1687176565; _pin_unauth=dWlkPU56UmpZbVZtWlRrdE9USTBOeTAwWVdabExXSm1Nakl0TTJZeE5EVXlOV0kwWm1VMA; hubspotutk=52c38bf449bf55ce5c5bff252578c1d3; __hssrc=1; WE3P=dce96011-a345-439e-b1cd-99dd15ed4341230619; spark-nav-onboarding-completion=Mon%20Jun%2019%202023%2020:13:51%20GMT+0800%20(Taipei%20Standard%20Time); role-invitation-decline-notification=false; role-resignation-notification=false; _gid=GA1.3.591372219.1687700987; ln_or=eyIzOTUzMDAiOiJkIn0%3D; seen-tour-in-past-day=true; lang=en-gb; g_state={\"i_l\":1,\"i_t\":1687787579703,\"i_p\":1687708395696}; csrftoken=hsBkarOr4CfOmpoyS6iVP08PuMmY96Cqrdq5bmnEU7N04rV1tuiHizZdMeupVjhb; ndbr_at=oclhs29Zdf5ON-A6svxjp24QijSz7sa-HxzHAS4Rbxg; ndbr_idt=eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZmU4NTNkLTlmMTktNGJhMy05NTY4LTA1ZTg1MTk0ODFkOSIsInR5cCI6IkpXVCJ9.eyJhdF9oYXNoIjoiV2JIS2YrVWpuenNRRnFXYy9JcWxzZyIsImF1ZCI6WyJuZXh0ZG9vci1kamFuZ28iLCJuZXh0ZG9vciJdLCJleHAiOjE2ODc3ODc2MDQsImlhdCI6MTY4NzcwMTIwNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm5leHRkb29yLmNvbSIsIm5kX3ByYyI6W3siY291bnRyeSI6IkdCIiwicGlkIjoiMTc1OTIyMDQ3OTE0MTAiLCJ1cmwiOiJodHRwczovL3VzZXIubmV4dGRvb3IuY28udWsvdjEvcHJvZmlsZS8xNzU5MjIwNDc5MTQxMCJ9XSwic3ViIjoiNDc5M2JkMjUtMDQxOS00NDZhLTgxNWMtYjZlYmYwMzBhMDZlIn0.W9MJEUtuaMxJXatqcfdlVNO4hIQZ8UsW9lkEbjZC5-TUN-Yp_4F1S8IJEn7QcE8_15GariQG2vINCu527d2iImFLb3p58DOF_EcjpImfEGFHB2pDMe4m5tabBcXwHdtmHUg9E5gjcbxbb8yxSv6MmMEqRG_3LLzboX5aCqIMZATOBDQSrtkRZGFSJX7U2Y4_0NvrX4w5qU83Z7pLxLp1N05odQtMFUHw0JQlQ4TvvrWrFiHYnOhfMaee515puKHUm-_9fjk_MYHQ3ClHf73dNEhDrpb2_n3hA5071bYykS3jxhfHyA61uibzPNrwiA83R3Tz4f4-gWRT2B_iR0BKFQ; s=kuewedtvjf6cwqcvoy24o1he1pgto315; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Jun+26+2023+21%3A16%3A00+GMT%2B0800+(Taipei+Standard+Time)&version=202209.2.0&isIABGlobal=false&hosts=&consentId=bbbe1495-20a6-4b6f-8f68-a7e0bc0eb167&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A0%2CC0004%3A0%2CC0002%3A0&AwaitingReconsent=false; _ga=GA1.1.1796352805.1687176565; _ga_L2ES4MTTT0=GS1.1.1687785357.5.1.1687785362.55.0.0; _ga_HRMXJS2LRC=GS1.1.1687785357.5.1.1687785362.0.0.0; _uetsid=25dda540135f11ee88f9f7438610c610; _uetvid=21d2bde00e9a11eebb8345971136d640; __hstc=35119166.52c38bf449bf55ce5c5bff252578c1d3.1687176568926.1687700989453.1687785363498.4; __hssc=35119166.1.1687785363498; WERC=4ec8a138-f9d2-4a64-819a-bb9d825175ef2306261687786487; _dd_s=logs=1&id=e0b53454-fb31-4377-b213-ba40c4b88fa2&created=1687785353191&expire=1687787445846",
            "Referer": "https://nextdoor.co.uk/neighborhood",
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
