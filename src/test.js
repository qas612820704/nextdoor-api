const fs = require('fs');
const { unparse } = require('papaparse');

main();
async function main() {
    const data = JSON.parse(fs.readFileSync('feeds.json', 'utf8'));
    const csv = unparse(data);
    console.log(csv);
}
