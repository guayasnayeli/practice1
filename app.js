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

function drawGrid(list) {
  const root = document.getElementById("gridContainer");
  root.innerHTML = "";

  list.forEach((entry, i) => {
    const item = entry.show;

    const box = document.createElement("div");
    box.classList.add("tile");

    box.innerHTML = `
      <img src="${item.image ? item.image.medium : ''}">
      <p>${item.name}</p>
    `;

    box.addEventListener("click", () => openPreview(i));

    root.appendChild(box);
  });
}

function openPreview(pos) {
  sessionStorage.setItem("focusItem", pos);
  window.location.assign("preview.html");
}


