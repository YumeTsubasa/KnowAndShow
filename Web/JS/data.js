// Load JSON data from local file and populate matching containers
fetch('q1.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load JSON: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    data.forEach(item => {
      const container = document.getElementById(item.id);
      if (container) {
        container.innerHTML = `
          <h2>${item.type}</h2>
          <p>${item.img}</p>
		  <p>${item.question}</p>
        `;
      }
    });
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });