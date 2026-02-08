const newsBox = document.getElementById("newsBox");

const API_KEY = "1f5e1e096d1005875801f9509e57ccb7";

fetch(`https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    newsBox.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      newsBox.textContent = "No news available";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-item";   // 👈 ADDED HERE

      card.innerHTML = `
        <div class="news-title">${article.title}</div>
        <div class="news-source">${article.source?.name || "Unknown Source"}</div>
        <div class="divider"></div>
      `;

      newsBox.appendChild(card);
    });
  })
  .catch(error => {
    newsBox.textContent = "Error loading news";
    console.error(error);
  });
