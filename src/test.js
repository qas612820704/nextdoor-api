const { fetchFeeds } = require('./fetch');
const location = 'regentspark';

main();
async function main() {
    const result = await fetchFeeds(location);
    console.log(result);
}
