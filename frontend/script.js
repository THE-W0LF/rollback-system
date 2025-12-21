const ENTITY_ID = "6945966adbca9a7546769c14"; // ← your entity ID
const API_BASE = "http://localhost:5000/api";

// Load entity + versions
async function loadData() {
  // Get versions
  const versionsRes = await fetch(`${API_BASE}/entities/${ENTITY_ID}/versions`);
  const versions = await versionsRes.json();

  // Latest entity state is NOT in versions, so get from DB directly
  const entityRes = await fetch(`${API_BASE}/entities/${ENTITY_ID}`);
  const entity = await entityRes.json();

  document.getElementById("entity-name").innerText = entity.name;
  document.getElementById("entity-status").innerText = entity.status;

  const list = document.getElementById("versions");
  list.innerHTML = "";

  versions.forEach(v => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>v${v.versionNumber}: ${v.snapshot.status}</span>
      <button onclick="rollback('${v._id}')">Rollback</button>
    `;
    list.appendChild(li);
  });
}

async function rollback(versionId) {
  await fetch(`${API_BASE}/entities/${ENTITY_ID}/rollback/${versionId}`, {
    method: "POST"
  });

  loadData();
}

loadData();
