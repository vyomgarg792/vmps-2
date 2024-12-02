document.getElementById('sendChat').addEventListener('click', function () {
    const input = document.getElementById('chatInput').value;

    if (input.trim() === "") {
        alert("Please type a message first.");
        return;
    }

    // Fetch the response from OpenAI API
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Adjust the model as necessary
            messages: [{ role: "user", content: input }]
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.choices && data.choices.length > 0) {
                const chatResponse = data.choices[0].message.content;
                document.getElementById('chatResponse').innerText = chatResponse;

                // Speak the response using text-to-speech
                const speech = new SpeechSynthesisUtterance(chatResponse);
                speech.lang = "en-US"; // Adjust the language as necessary
                window.speechSynthesis.speak(speech);
            } else {
                document.getElementById('chatResponse').innerText = "No response from ChatGPT.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('chatResponse').innerText = "An error occurred. Please try again.";
        });
});
