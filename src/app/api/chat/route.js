import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req){
    const data = await req.json()

    console.log("data: ", data)

    const url = "https://flask-api-for-leonsi.vercel.app/api/get-response"
  
    const headers = {
        'Content-Type': 'application/json',
    };

    const listOfMessages = data.messages
    const lastMessage = listOfMessages[listOfMessages.length - 1].content

    const dataToBeSent = {
        prompt: lastMessage
    }
        
    const results = await axios.post(url, dataToBeSent, { headers }).then(response => {
        return response.data.response
    }).catch(error => {
        console.error(error);
    });

    return new NextResponse(results)

}