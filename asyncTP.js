'use strict';

const https = require('https');
const fs = require('fs').promises;

const randomQuotePromesse = () => {

    return new Promise((fufill, reject) => {

        https.get('https://zenquotes.io/api/random', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                fufill(JSON.parse(data));
            });

        }).on("error", (err) => {

            reject(err);
        });
    })
}

async function asyncCallQuotes(){
    let texte = "";
    for (let i = 0; i < 10; i++){
        console.log(`récupération des citations : n°${i+1}`);
        const quote = await randomQuotePromesse();
        const citation = quote[0].q;
        texte += citation + '\n';
    }
    await fs.writeFile('citation.txt', texte);
}

asyncCallQuotes();