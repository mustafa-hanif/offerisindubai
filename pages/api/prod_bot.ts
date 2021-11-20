// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createClient } from '@supabase/supabase-js'
import fs from 'fs';

import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { TelegramMessage } from '../../types/TelegramMessage';

const supabaseUrl = 'https://jsrjlfxhklrtqwqmtecc.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = process.env.AZURE_KEY;
const endpoint = 'https://computervisionicemelt7.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);


export default async function ProdBot(req, res) {
  try {
    console.log("recieve message");
    console.log(JSON.stringify(req.body));
    const telegramMessage: TelegramMessage = req.body;
    await supabase.from('logs').insert({ text: telegramMessage });
    const photos = telegramMessage.message.photo;

    if (!photos) {
      console.log('No photo');
      return res.status(200).json({
        message: 'No photo'
      });
    }

    const file = photos[photos.length - 1];
    const file_id = file.file_id;
    const result = await getFile(file_id);
    const resultJson = await result.json();
    
    const file_path = resultJson.result.file_path;
    const file_result = await downloadFile(file_path);
    await saveFile(file_result.body, './public/images/' + file_id + '.jpg');
    // read file from disk
    const file_name = './public/images/' + file_id + '.jpg';
    const file_buffer = fs.readFileSync(file_name);
    const allWords = await readTextFromURL(computerVisionClient, file_buffer);

    supabase.from('')
    res.status(200).json(req.body)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // const { data, error } = await supabase
  // .from('logs')
  // .insert([
  //   { text: req.body },
  // ])
  // if (error) {
  //   res.status(500).json(error)  
  // }
  // res.status(200).json(data)
}

// getFile from Telegram API
// https://core.telegram.org/bots/api#getfile
function getFile(file_id) {
  console.log(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/getFile?file_id=${file_id}`);
  return fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/getFile?file_id=${file_id}`);
}

// download file from telegram API and save to disk
// https://core.telegram.org/bots/api#downloadfile
function downloadFile(file_path: any): Promise<Response> {
  return fetch(`https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${file_path}`);
}

// save file to disk, create folder if not exists
function saveFile(file: any, file_name: string) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(file_name, { flags: 'w' });
    fileStream.on('finish', () => {
      resolve(file_name);
    });
    fileStream.on('error', (err) => {
      reject(err);
    });
    file.pipe(fileStream);
  });
}

// Perform read and await the result from URL
async function readTextFromURL(client: ComputerVisionClient, file) {
  // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
  const text = await client.recognizePrintedTextInStream(false, file);
  console.log(JSON.stringify(text));
  let result = '';
  const allWords = text.regions.forEach(region => {
    region.lines.forEach(line => {
      line.words.forEach(word => {
        result += word.text + ' ';
      })
    })
  })
  console.log(result);
  return result;
}