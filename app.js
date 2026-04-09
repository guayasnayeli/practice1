/* ---------- LOGIN ---------- */

// Handles login button click
function handleAccess() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Simple validation (not empty)
  if (!user || !pass) {
    alert("Please enter user and password");
    return;
  }

  // Save session flag
  sessionStorage.setItem("sessionActive", "true");

  // Redirect to search page
  window.location = "search.html";
}

/* ---------- SEARCH ---------- */

// Fetch data from API
async function runSearch() {
  const input = document.getElementById("searchInput").value;

  if (!input) {
    alert("Write something");
    return;
  }

  // Call API
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${input}`);
  const data = await res.json();

  // Save results and query
  sessionStorage.setItem("data", JSON.stringify(data));
  sessionStorage.setItem("query", input);

  // Render results
  showResults(data);
}

/* ---------- RENDER RESULTS ---------- */

// Display cards on screen
function showResults(list) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    const show = list[i].show;

    const card = document.createElement("div");
    card.className = "tile";

    // Clean short description
    let desc = "No description";
    if (show.summary) {
      desc = show.summary.replace(/<[^>]+>/g, "").substring(0, 80);
    }

    // Card content
    card.innerHTML = `
      <img src="${show.image ? show.image.medium : ''}">
      <h4>${show.name}</h4>
      <p>${desc}...</p>
    `;

    // Click → go to detail
    card.onclick = function () {
      sessionStorage.setItem("index", i);
      window.location = "detail.html";
    };

    container.appendChild(card);
  }
}

/* ---------- RESTORE SEARCH ---------- */

// Restore data when returning from detail page
window.onload = function () {

  // If we are in search page
  if (document.getElementById("results")) {
    const savedData = sessionStorage.getItem("data");
    const savedQuery = sessionStorage.getItem("query");

    if (savedQuery) {
      document.getElementById("searchInput").value = savedQuery;
    }

    if (savedData) {
      showResults(JSON.parse(savedData));
    }
  }

  // If we are in detail page
  if (document.getElementById("viewer")) {
    loadDetail();
  }
};

/* ---------- DETAIL ---------- */

// Load selected item
function loadDetail() {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const index = sessionStorage.getItem("index");

  if (!data) return;

  const show = data[index].show;

  document.getElementById("viewer").innerHTML = `
    <h2>${show.name}</h2>
    <img src="${show.image ? show.image.original : ''}">
    <p>${show.summary}</p>
  `;
}

/* ---------- BACK ---------- */

// Go back to search page
function returnToList() {
  window.location = "search.html";
}