const resultsTable = document.getElementById("results");
const viewer = document.getElementById("viewer");

document.getElementById("searchBtn").addEventListener("click", () => {
    runQuery();
});

document.getElementById("query").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        runQuery();
    }
})

function runQuery() {
    const query = document.getElementById("query").value.trim();
    if (!query) return;
    searchNASA(query);
}

async function searchNASA(query) {
    resultsTable.innerHTML = "<tr><td>Loading...</td></tr>";
    viewer.innerHTML = "";

    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    const response = await fetch(url);
    const data = await response.json();
    const items = data.collection.items.slice(0, 10); // only get the first 10 results.

    if (!items.length) {
        resultsTable.innerHTML = "<tr><td>No results found.</td></tr>";
        return;
    }

    resultsTable.innerHTML = items.map(item => {
        const title = item.data[0].title;
        const thumb = item.links?.[0]?.href;
        const full = item.href;
        return `<tr data-full="${full}" data-thumb="${thumb}" data-title="${title}">
                  <td>${title}</td>
                </tr>`;
    }).join("");

    resultsTable.querySelectorAll("tr").forEach(row => {
        row.addEventListener("click", async () => {
            const fullUrl = row.dataset.full;
            viewer.innerHTML = "<p>Loading image...</p>";

            const imgList = await fetch(fullUrl).then(r => r.json());
            const imageUrl = imgList.find(url => url.endsWith("~orig.jpg")) || imgList[0];

            viewer.innerHTML = `
              <h2>${row.dataset.title}</h2>
              <img src="${imageUrl}" alt="${row.dataset.title}">
            `;
        });
    });
}