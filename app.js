function handleAccess() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (!u || !p) return;

  sessionStorage.setItem("sessionActive", "1");

  window.location.assign("search.html");

}