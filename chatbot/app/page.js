'use client'
import Image from "next/image";
import {useState} from 'react';
import {Box, Stack} from '@mui/material';

export default function Home() {
    const [messages,setMessages] = useState({
      role:'assistant',
      content:`Hi I'm the Olympic Info chatbot, how can I assist you today?`
    })
    //For the message in the textbox
    const [message, setMessage] = useState('')
}
