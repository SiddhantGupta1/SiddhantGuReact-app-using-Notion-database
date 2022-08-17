const express = require('express');
const {Client} = require('@notionhq/client');
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({auth: "secret_gok5jCGm3Rrr5XVSnwE0hjaGi2ytdaXYqLUEP6B4Ryw"});

const databaseId = "6e1eb23fdef440f3a3f9b12aa7138c52";

app.post('/submitToNotion', jsonParser, async (req,res) => {
    const name = req.body.name;
    const label = req.body.label;
    const url = req.body.url;
    console.log(name)

    try{
        const response = await notion.pages.create({
            "parent": {"database_id": databaseId},
            "properties": {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                "Label": {
                    rich_text: [
                        {
                            text: {
                                content: label
                            }
                        }
                    ]
                },
                "Url": {
                    rich_text: [
                        {
                            text: {
                                content: url
                            }
                        }
                    ]
                }
            }
        })

        console.log(response);
        console.log("SUCCESS");
    }
    catch(err){
        console.log(err);
    }

 
})



app.listen(PORT, HOST, () => {
    console.log("Starting proxy at "+ HOST + ":" + PORT);
})