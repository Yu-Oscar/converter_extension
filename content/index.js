// Store the selection position
let lastSelectionRect = null;

// Capture selection position when user selects text
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0 && selection.toString().trim()) {
    const range = selection.getRangeAt(0);
    lastSelectionRect = range.getBoundingClientRect();
  }
});

// Also capture on touchend for mobile
document.addEventListener("touchend", () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0 && selection.toString().trim()) {
    const range = selection.getRangeAt(0);
    lastSelectionRect = range.getBoundingClientRect();
  }
});

function createOverlay() {
  // Remove existing overlay if present
  const existing = document.getElementById("smart-converter-overlay");
  if (existing) {
    existing.remove();
  }

  const overlay = document.createElement("div");
  overlay.id = "smart-converter-overlay";

  // Calculate position relative to the selected text
  let top = 20;
  let left = 20;
  let arrowOffset = 150; // Default arrow position (center of 300px tooltip)

  if (lastSelectionRect) {
    // Position tooltip below the selection, accounting for scroll position
    top = lastSelectionRect.bottom + window.scrollY + 10;

    // Calculate the center of the selection in document coordinates
    const selectionCenter =
      lastSelectionRect.left + window.scrollX + lastSelectionRect.width / 2;

    const tooltipWidth = 300;

    // First, try to center the tooltip on the selection
    let idealLeft = selectionCenter - tooltipWidth / 2;

    // Keep tooltip within document bounds (accounting for scroll)
    const minLeft = window.scrollX + 10;
    const maxLeft = window.scrollX + window.innerWidth - tooltipWidth - 10;

    // If the ideal position fits within bounds, use it and center the arrow
    if (idealLeft >= minLeft && idealLeft <= maxLeft) {
      left = idealLeft;
      arrowOffset = tooltipWidth / 2; // Arrow at center of tooltip
    } else {
      // Tooltip needs to be constrained, so position tooltip at boundary
      // but keep arrow pointing at selection center
      left = Math.max(minLeft, Math.min(idealLeft, maxLeft));

      // Calculate where arrow should be to point at selection center
      arrowOffset = selectionCenter - left;

      // Ensure arrow stays within tooltip bounds (with padding for arrow width)
      arrowOffset = Math.max(16, Math.min(arrowOffset, tooltipWidth - 16));
    }
  }

  overlay.style.cssText = `
    position: absolute !important;
    top: ${top}px !important;
    left: ${left}px !important;
    z-index: 2147483647 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    font-size: 14px !important;
    pointer-events: none !important;
  `;

  // Store arrow offset for use in tooltip creation
  overlay.dataset.arrowOffset = arrowOffset;

  document.body.appendChild(overlay);
  return overlay;
}

function showResult(result, originalText) {
  console.log("showResult called with:", result, originalText);

  const overlay = createOverlay();

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
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
    position: relative;
  `;

  // Add pointer arrow
  const arrow = document.createElement("div");
  const arrowOffset = overlay.dataset.arrowOffset || "150";

  arrow.style.cssText = `
    position: absolute;
    top: -8px;
    left: ${arrowOffset}px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
    filter: drop-shadow(0 -2px 1px rgba(0,0,0,0.1));
  `;

  tooltip.appendChild(arrow);

  // Detected value header
  const detectedDiv = document.createElement("div");
  detectedDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;

  // Set detected text based on conversion type
  if (result.type === "temperature") {
    detectedDiv.textContent = `Detected: ${result.detectedTemp || ''}${result.tempData?.unit?.toUpperCase() || ''}`;
  } else if (result.type === "length") {
    detectedDiv.textContent = `Detected: ${result.detectedValue || ''}`;
  } else if (result.type === "weight") {
    detectedDiv.textContent = `Detected: ${result.detectedValue || ''}`;
  } else if (result.type === "currency") {
    detectedDiv.textContent = `Detected: ${result.detectedValue || ''}`;
  } else if (result.type === "time") {
    detectedDiv.textContent = `Detected: Time`;
  } else {
    detectedDiv.textContent = `Detected: ${result.detectedValue || ''}`;
  }

  // Conversions container
  const conversionsContainer = document.createElement("div");

  if (result.conversions && result.conversions.length > 0) {
    result.conversions.forEach((conv) => {
      const convDiv = document.createElement("div");
      convDiv.style.cssText = "margin-bottom: 8px;";

      const label = document.createElement("div");
      label.style.cssText = `
        font-weight: 500;
        color: #666;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      label.textContent = conv.label;

      const value = document.createElement("div");

      // Color coding based on type
      let color = "#2563eb"; // Default blue for time
      if (result.type === "temperature") {
        color = "#dc2626"; // Red for temperature
      } else if (result.type === "length") {
        color = "#059669"; // Green for length
      }

      value.style.cssText = `
        color: ${color};
        font-weight: 600;
        margin-top: 2px;
        font-size: 16px;
      `;
      value.textContent = conv.value;

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      conversionsContainer.appendChild(convDiv);
    });
  }

  tooltip.appendChild(detectedDiv);
  tooltip.appendChild(conversionsContainer);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
  };

  const handleDocumentClick = (e) => {
    if (!tooltip.contains(e.target)) {
      closeTooltip();
    }
  };

  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateY(0)";
  });
}

function showError(error, originalText) {
  console.log("showError called with:", error, originalText);

  const overlay = createOverlay();

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
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
    position: relative;
  `;

  // Add pointer arrow pointing up (tooltip is always below selection)
  const arrow = document.createElement("div");
  const arrowOffset = overlay.dataset.arrowOffset || "150";

  arrow.style.cssText = `
    position: absolute;
    top: -8px;
    left: ${arrowOffset}px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
    filter: drop-shadow(0 -2px 1px rgba(0,0,0,0.1));
  `;

  tooltip.appendChild(arrow);

  const detectedDiv = document.createElement("div");
  detectedDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    font-style: italic;
  `;
  detectedDiv.textContent = `Could not convert`;

  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
    color: #dc2626;
    font-style: italic;
    margin-bottom: 12px;
  `;
  errorDiv.textContent = `Error: ${error}`;

  tooltip.appendChild(detectedDiv);
  tooltip.appendChild(errorDiv);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
  };

  const handleDocumentClick = (e) => {
    // Don't close if clicking inside the tooltip
    if (!tooltip.contains(e.target)) {
      closeTooltip();
    }
  };

  // Add click listener after a short delay to prevent immediate closing
  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  // Also close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  // Show with animation
  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateY(0)";
  });
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message);

  if (message.action === "showConversion") {
    showResult(message.result, message.originalText);
  } else if (message.action === "showError") {
    showError(message.error, message.originalText);
  }

  sendResponse({ received: true });
});
