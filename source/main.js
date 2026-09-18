"use strict";

// Wait until the HTML document has loaded
document.addEventListener("DOMContentLoaded", () => {
  setupQnaButtons();
  setupWarningMessage();
});

/**
 * Updates the state of one Q&A item.
 */
function setQnaState(button, answer, isOpen) {
  const arrow = button.querySelector(".arrow");

  button.setAttribute("aria-expanded", String(isOpen));
  answer.classList.toggle("is-open", isOpen);

  if (arrow) {
    arrow.style.transform = isOpen
      ? "rotate(0deg)"
      : "rotate(-90deg)";
  }
}

/**
 * Sets up every Q&A button on the page.
 */
function setupQnaButtons() {
  const qnaButtons = Array.from(
    document.querySelectorAll(".qna-button")
  );

  qnaButtons.forEach((button) => {
    const answerId = button.getAttribute("aria-controls");

    if (!answerId) return;

    const answer = document.getElementById(answerId);

    if (!answer) return;

    // With JavaScript enabled, every answer starts collapsed.
    setQnaState(button, answer, false);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      setQnaState(button, answer, !isOpen);
    });
  });
}

/**
 * Displays the footer warning and removes it when dismissed.
 */
function setupWarningMessage() {
  const footer = document.querySelector("footer");

  if (!footer) return;

  footer.insertAdjacentHTML(
    "beforeend",
    `
      <div id="warn">
        <div id="warn-msg">
          <p id="warn-p">
            This page stores no cookies. JavaScript functionality is purely cosmetic.
          </p>
          <button id="warn-b" type="button">Ok</button>
        </div>
      </div>
    `
  );

  const warning = document.getElementById("warn");
  const closeButton = document.getElementById("warn-b");

  if (!warning || !closeButton) return;

  warning.style.display = "block";

  closeButton.addEventListener("click", () => {
    warning.remove();
  });
}
