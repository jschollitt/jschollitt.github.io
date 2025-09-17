window.addEventListener('DOMContentLoaded', function() {   
    // Use the Fetch API to load the XML file
    fetch('https://jschollitt.github.io/week9/bootstrapJSON/assets/data/cards.json')
    // From the response, get the text
        .then(response => response.json())
        // Create a callback function to handle the XML text
        .then(cards => {
            // Get the card container element from the HTML
            const cardContainer = document.getElementById("card-container");

            cards.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("col-md-4");
                cardElement.style.marginBottom = "20px";


                cardElement.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${card.image}" class="card-img-top" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.description}</p>
                    </div>
                </div>`;
                
                // Append the card element to the card container
                cardContainer.appendChild(cardElement);
            });
        })
        // Handle any errors that occur during the fetch
        .catch(error => {
            console.error('Error fetching XML:', error)
            document.getElementById("card-container").innerHTML = "<p class='text-danger'>Failed to load cards.</p>";
        });
});