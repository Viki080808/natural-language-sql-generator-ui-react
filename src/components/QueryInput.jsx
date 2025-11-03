import { useEffect, useState } from "react";
import {Box, TextField, IconButton, CircularProgress} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function QueryInput({ onResult, initialPrompt }) {
    const[message, setMessage] = useState("");
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialPrompt) {
            setMessage(initialPrompt);
        }
    }, [initialPrompt]);

    const handleSend = async () => {
        if (!message.trim()) return;
        setLoading(true);

        console.log("sending message:", message);
        try {
            const res = await axios.post("/api/sql/getData", { message })
            onResult(res.data);
        } catch (err) {
            console.error(err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display:"flex", gap:1, alignItems:"center"}}>
            <TextField
            color="#0d0c0d"
                fullWidth
                multiline
                placeholder='Ask me a data question... e.g., "Get recent 10 rows of orders"'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key == "Enter" && handleSend()}
                sx={{'& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: '#0d0c0d'
                },
                },}}
            />
            <IconButton color="green" onClick={handleSend} disabled={loading} >
                {loading ? <CircularProgress size={24} /> : <SendIcon fontSize="large" sx={{ color:'#0d0c0d'}} />}
            </IconButton>
        </Box>
    );

}