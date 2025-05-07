window.addEventListener('DOMContentLoaded', function() {   
    // Use the Fetch API to load the XML file
    this.fetch('./assets/data/cards.xml')
        // From the response, get the text
        .then(response => response.text())
        // Create a callback function to handle the XML text
        .then(data => {
            // Parse the XML string into an XML document
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // Get the card elements from the XML document
            const cards = xmlDoc.getElementsByTagName("card");

            // Get the card container element from the HTML
            const cardContainer = document.getElementById("card-container");

            // Loop through the card elements and create HTML elements for each
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                const title = card.getElementsByTagName("title")[0].textContent;
                const description = card.getElementsByTagName("description")[0].textContent;
                const imageUrl = card.getElementsByTagName("image")[0].textContent;

                const cardElement = document.createElement("div");
                cardElement.classList.add("col-md-4");
                cardElement.style.marginBottom = "20px";


                cardElement.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                </div>`;
                
                // Append the card element to the card container
                cardContainer.appendChild(cardElement);
            }
        })
        // Handle any errors that occur during the fetch
        .catch(error => console.error('Error fetching XML:', error));
});