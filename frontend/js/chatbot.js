document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'https://agri-ai-backend-dmev.onrender.com'; 

    // --- AGRO CHATBOT SELECTORS ---
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');

    // If any chatbot element is missing, do not proceed.
    if (!chatToggleBtn || !chatWindow || !chatBox || !chatInput || !chatSendBtn) {
        return;
    }

    // --- CHATBOT LOGIC ---

    // Function to toggle chat window visibility
    function toggleChat() {
        if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
            chatWindow.style.display = 'flex';
            chatWindow.classList.remove('fade-out');
            chatWindow.classList.add('fade-in');
            chatInput.focus();
        } else {
            chatWindow.classList.remove('fade-in');
            chatWindow.classList.add('fade-out');
            // Hide the element after the animation completes
            setTimeout(() => {
                chatWindow.style.display = 'none';
            }, 300); // Duration should match the fade-out animation
        }
    }
    chatToggleBtn.addEventListener('click', toggleChat);
    chatCloseBtn.addEventListener('click', toggleChat);

    // Helper to add a new message to the chat UI
    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `p-3 rounded-xl shadow-sm text-sm max-w-[85%] break-words ${type === 'user' ? 'msg-user' : 'msg-agro'}`;
        msgDiv.innerHTML = text; // Use innerHTML to allow for <br> tags from the AI
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    }

    // Main function to handle sending a message
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        chatInput.value = '';
        chatInput.disabled = true;

        // --- LANGUAGE AWARE FIX ---
        // 1. Get the currently selected language from browser storage.
        const currentLang = localStorage.getItem('language') || 'en';

        // 2. Use the translations object for the "thinking" message.
        const thinkingMessage = translations['chatThinking'][currentLang];

        // Add a "typing..." indicator in the correct language
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'p-3 rounded-xl shadow-sm text-sm max-w-[85%] msg-agro italic text-gray-500';
        loadingDiv.textContent = thinkingMessage; // Use the translated text
        chatBox.appendChild(loadingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            // 3. Send the message AND the current language to the backend.
            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: message,
                    language: currentLang // Send the language to the backend
                })
            });
            const data = await response.json();

            document.getElementById(loadingId).remove(); // Remove the typing indicator
            const formattedReply = data.reply.replace(/\n/g, '<br>'); 
            addMessage(formattedReply, 'agro');

        } catch (error) {
            console.error("Chatbot API error:", error);
            document.getElementById(loadingId).remove();
            addMessage('Sorry, I am having trouble connecting to my brain right now. Please try again later.', 'agro');
        } finally {
            chatInput.disabled = false;
            chatInput.focus();
        }
    }

    // Event listeners for sending a message
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents form submission if it's inside a form
            sendMessage();
        }
    });
});