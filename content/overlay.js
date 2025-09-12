function createOverlay() {
  if (document.getElementById("smart-converter-overlay")) {
    return document.getElementById("smart-converter-overlay");
  }

  const overlay = document.createElement("div");
  overlay.id = "smart-converter-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    pointer-events: none;
  `;

  const shadowRoot = overlay.attachShadow({ mode: "closed" });

  const style = document.createElement("style");
  style.textContent = `
    .tooltip {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 16px;
      max-width: 300px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.2s ease;
      pointer-events: auto;
    }
    
    .tooltip.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .conversion {
      margin-bottom: 8px;
    }
    
    .conversion:last-of-type {
      margin-bottom: 12px;
    }
    
    .label {
      font-weight: 500;
      color: #666;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .value {
      color: #2563eb;
      font-weight: 600;
      margin-top: 2px;
    }
    
    .actions {
      border-top: 1px solid #eee;
      padding-top: 12px;
      display: flex;
      gap: 8px;
    }
    
    .copy-btn {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .copy-btn:hover {
      background: #1d4ed8;
    }
    
    .copy-btn.copied {
      background: #16a34a;
    }
    
    .close-btn {
      background: #f3f4f6;
      color: #6b7280;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-left: auto;
    }
    
    .close-btn:hover {
      background: #e5e7eb;
    }
    
    .error {
      color: #dc2626;
      font-style: italic;
    }
  `;

  shadowRoot.appendChild(style);
  document.body.appendChild(overlay);

  return { overlay, shadowRoot };
}

function showResult(result, originalText) {
  const { overlay, shadowRoot } = createOverlay();

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";

  const conversionsContainer = document.createElement("div");

  if (result.conversions && result.conversions.length > 0) {
    result.conversions.forEach((conv) => {
      const convDiv = document.createElement("div");
      convDiv.className = "conversion";

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = conv.label;

      const value = document.createElement("div");
      value.className = "value";
      value.textContent = conv.value;

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      conversionsContainer.appendChild(convDiv);
    });
  }

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  if (result.copyValue) {
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy ISO";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(result.copyValue).then(() => {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy ISO";
          copyBtn.classList.remove("copied");
        }, 2000);
      });
    };
    actionsDiv.appendChild(copyBtn);
  }

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => hideOverlay();
  actionsDiv.appendChild(closeBtn);

  tooltip.appendChild(conversionsContainer);
  tooltip.appendChild(actionsDiv);

  shadowRoot.innerHTML = "";
  shadowRoot.appendChild(document.querySelector("style").cloneNode(true));
  shadowRoot.appendChild(tooltip);

  requestAnimationFrame(() => {
    tooltip.classList.add("visible");
  });

  setTimeout(hideOverlay, 10000);
}

function showError(error, originalText) {
  const { overlay, shadowRoot } = createOverlay();

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = `Could not convert: ${error}`;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => hideOverlay();
  actionsDiv.appendChild(closeBtn);

  tooltip.appendChild(errorDiv);
  tooltip.appendChild(actionsDiv);

  shadowRoot.innerHTML = "";
  shadowRoot.appendChild(document.querySelector("style").cloneNode(true));
  shadowRoot.appendChild(tooltip);

  requestAnimationFrame(() => {
    tooltip.classList.add("visible");
  });

  setTimeout(hideOverlay, 5000);
}

function hideOverlay() {
  const overlay = document.getElementById("smart-converter-overlay");
  if (overlay) {
    overlay.remove();
  }
}
