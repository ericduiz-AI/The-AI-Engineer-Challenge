const form = document.getElementById("chat-form");
const messageInput = document.getElementById("message");
const responseBox = document.getElementById("response");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();

  if (!message) {
    responseBox.textContent = "Please enter a message.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  responseBox.textContent = "Thinking...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Unexpected backend error");
    }

    responseBox.textContent = data.reply;
  } catch (error) {
    responseBox.textContent = `Error: ${error.message}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send message";
  }
});
