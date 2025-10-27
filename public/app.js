// Check wallet status on page load
window.addEventListener("DOMContentLoaded", () => {
  checkWalletStatus();
});

// Check wallet status
async function checkWalletStatus() {
  try {
    const response = await fetch("/api/wallet-status");
    const data = await response.json();

    if (data.success) {
      updateStatus("admin-status", data.admin);
      updateStatus("user-status", data.appUser);
    }
  } catch (error) {
    console.error("Error checking wallet status:", error);
    showMessage("enrollment-message", "Error checking wallet status", "error");
  }
}

// Update status badge
function updateStatus(elementId, enrolled) {
  const element = document.getElementById(elementId);
  if (enrolled) {
    element.textContent = "✅ Enrolled";
    element.className = "status enrolled";
  } else {
    element.textContent = "❌ Not Enrolled";
    element.className = "status not-enrolled";
  }
}

// Enroll admin
async function enrollAdmin() {
  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="loading"></span> Enrolling...';
  btn.disabled = true;

  try {
    const response = await fetch("/api/enroll-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      showMessage("enrollment-message", data.message, "success");
      checkWalletStatus();
    } else {
      showMessage("enrollment-message", data.error, "error");
    }
  } catch (error) {
    showMessage(
      "enrollment-message",
      "Error enrolling admin: " + error.message,
      "error"
    );
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Register user
async function registerUser() {
  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="loading"></span> Registering...';
  btn.disabled = true;

  try {
    const response = await fetch("/api/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      showMessage("enrollment-message", data.message, "success");
      checkWalletStatus();
    } else {
      showMessage("enrollment-message", data.error, "error");
    }
  } catch (error) {
    showMessage(
      "enrollment-message",
      "Error registering user: " + error.message,
      "error"
    );
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Query assets
async function queryAssets() {
  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="loading"></span> Querying...';
  btn.disabled = true;

  const resultContainer = document.getElementById("query-result");

  try {
    const response = await fetch("/api/query-assets");
    const data = await response.json();

    if (data.success) {
      if (data.data.length === 0) {
        resultContainer.innerHTML =
          '<p style="color: #666; margin-top: 15px;">No assets found in the ledger.</p>';
      } else {
        resultContainer.innerHTML =
          '<div class="asset-grid">' +
          data.data
            .map(
              (asset) => `
            <div class="asset-card">
              <h4>🏷️ ${asset.ID}</h4>
              <p><strong>Color:</strong> ${asset.Color}</p>
              <p><strong>Size:</strong> ${asset.Size}</p>
              <p><strong>Owner:</strong> ${asset.Owner}</p>
              <p><strong>Value:</strong> $${asset.AppraisedValue}</p>
            </div>
          `
            )
            .join("") +
          "</div>";
      }
    } else {
      resultContainer.innerHTML = `<p style="color: #721c24; margin-top: 15px;">❌ ${data.error}</p>`;
    }
  } catch (error) {
    resultContainer.innerHTML = `<p style="color: #721c24; margin-top: 15px;">❌ Error: ${error.message}</p>`;
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Create asset
async function createAsset(event) {
  event.preventDefault();

  const btn = event.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="loading"></span> Creating...';
  btn.disabled = true;

  const assetData = {
    id: document.getElementById("asset-id").value,
    color: document.getElementById("asset-color").value,
    size: document.getElementById("asset-size").value,
    owner: document.getElementById("asset-owner").value,
    appraisedValue: document.getElementById("asset-value").value,
  };

  try {
    const response = await fetch("/api/create-asset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assetData),
    });

    const data = await response.json();

    if (data.success) {
      showMessage("create-message", data.message, "success");
      document.getElementById("asset-form").reset();
      // Optionally refresh the asset list
      setTimeout(() => {
        const queryBtn = document.querySelector(".btn-success");
        if (queryBtn) queryBtn.click();
      }, 500);
    } else {
      showMessage("create-message", data.error, "error");
    }
  } catch (error) {
    showMessage(
      "create-message",
      "Error creating asset: " + error.message,
      "error"
    );
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Show message helper
function showMessage(elementId, message, type) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;

  setTimeout(() => {
    messageEl.className = "message";
  }, 5000);
}
