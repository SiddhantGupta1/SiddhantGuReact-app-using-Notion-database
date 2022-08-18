require("dotenv").config();
const express = require('express');
const {Client} = require('@notionhq/client');
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";
const notionSecret = process.env.NOTION_SECRET;
const databaseId = process.env.NOTION_DATABASE_ID;


const notion = new Client({auth: notionSecret });

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
                    "url": url
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