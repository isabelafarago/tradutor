function sendQuestion() {
	const inputQuestion = document.getElementById("inputQuestion");
	const result = document.getElementById("result");
  
	const data = { "question": inputQuestion.value };
  
	fetch("/api/send_question", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(data),
	})
	.then(response => {
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
	  return response.json();
	})
	.then(json => {
	  result.value += "\n";
  
	  if (json.error) {
		result.value += `Error: ${json.error}`;
	  } else {
		result.value += "Tradutor " + json.response;
	  }
  
	  result.scrollTop = result.scrollHeight;
	})
	.catch(error => {
	  console.error("Error:", error);
	})
	.finally(() => {
	  inputQuestion.value = "";
	  inputQuestion.disabled = false;
	  inputQuestion.focus();
  
	  if (result.value) {
		result.value += "\n\n\n";
	  }
  
	  result.value += `Eu: ${data.question}`;
	  inputQuestion.value = "Carregando...";
	  inputQuestion.disabled = true;
  
	  result.scrollTop = result.scrollHeight;
	});
  }
  