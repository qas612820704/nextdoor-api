const fs = require('fs');
const { unparse } = require('papaparse');

const { fetchFeeds } = require('./fetch');

const url = process.argv[2] || 'https://nextdoor.co.uk/neighborhood/regentspark--london--england/?source=settings';
const size = process.env.SIZR || 10;

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
