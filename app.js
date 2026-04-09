/* ---------- LOGIN ---------- */
function handleAccess() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (!u || !p) return;

  sessionStorage.setItem("sessionActive", "1");

  window.location.assign("search.html");

}

/* ---------- SEARCH ---------- */
async function runsearch() {
  const term = document.getElementById("searchInput").value;

  if (!term) return;

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${term}`);
  const payload = await response.json();

  // Save data for detail page
  sessionStorage.setItem("cacheList", JSON.stringify(payload));

  drawGrid(payload);
}

function renderCards(data) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  data.forEach((item, index) => {
    const show = item.show;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${show.image ? show.image.medium : ''}">
      <h4>${show.name}</h4>
    `;

    card.onclick = () => {
      localStorage.setItem("selectedIndex", index);
      window.location.href = "detail.html";
    };

    container.appendChild(card);
  });
}

/* ---------- DETAIL ---------- */
function loadDetail() {
  const data = JSON.parse(localStorage.getItem("data"));
  const index = localStorage.getItem("selectedIndex");

  if (!data || index === null) return;

  const show = data[index].show;

  document.getElementById("detail").innerHTML = `
    <h2>${show.name}</h2>
    <img src="${show.image ? show.image.original : ''}">
    <p>${show.summary}</p>
  `;
}

/* Run only in detail page */
if (document.getElementById("detail")) {
  loadDetail();
}

/* ---------- BACK ---------- */
function goBack() {
  window.location.href = "search.html";
}