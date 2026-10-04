// OmniHub - Main App JavaScript

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Helpers
  // =========================

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // =========================
  // Modal
  // =========================

  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalText = $("#modalText");
  const modalAction = $("#modalAction");
  const closeModal = $("#closeModal");

  function openModal(title, text, actionText = "") {
    if (!modal) return;

    if (modalTitle) modalTitle.textContent = title;
    if (modalText) modalText.textContent = text;

    if (modalAction) {
      modalAction.textContent = actionText;
      modalAction.style.display = actionText ? "inline-block" : "none";
    }

    modal.classList.add("open");
  }

  function hideModal() {
    if (modal) modal.classList.remove("open");
  }

  if (closeModal) {
    closeModal.onclick = hideModal;
  }

  if (modal) {
    modal.onclick = (event) => {
      if (event.target === modal) {
        hideModal();
      }
    };
  }

  // =========================
  // Account / Sign in
  // =========================

  const savedName = localStorage.getItem("omnihub_name");

  function showAccount() {
    const name = localStorage.getItem("omnihub_name");

    if (name) {
      openModal(
        "Welcome back, " + name + "!",
        "Your OmniHub demo account is saved on this device.",
        "Continue"
      );
    } else {
      openModal(
        "Create your OmniHub account",
        "Enter your name to create a demo account on this device.",
        "Create account"
      );
    }
  }

  function signIn() {
    const oldName = localStorage.getItem("omnihub_name");

    if (oldName) {
      showAccount();
      return;
    }

    openModal(
      "Create your OmniHub account",
      "Enter your name below, then press Create account.",
      "Create account"
    );
  }

  // Sign-in buttons
  $$("#signInBtn, .sign-in-btn, [data-action='signin']").forEach((button) => {
    button.addEventListener("click", signIn);
  });

  // =========================
  // Modal Action
  // =========================

  if (modalAction) {
    modalAction.onclick = () => {

      const input = modal ? modal.querySelector("input") : null;

      if (input) {
        const name = input.value.trim();

        if (name) {
          localStorage.setItem("omnihub_name", name);

          openModal(
            "Account created successfully!",
            "Welcome to OmniHub, " + name + "! Your demo account is now saved on this device.",
            "Continue"
          );

          input.value = "";
        }
      } else {
        hideModal();
      }
    };
  }

  // =========================
  // New Message
  // =========================

  $$("#newChatBtn, [data-action='message'], .message-btn").forEach((button) => {
    button.addEventListener("click", () => {

      openModal(
        "New message",
        "Messaging is ready for the OmniHub interface. Real-time messaging will be connected to a secure backend in the next development stage.",
        "Close"
      );

    });
  });

  // =========================
  // Video Call
  // =========================

  $$("#videoBtn, [data-action='video'], .video-btn").forEach((button) => {
    button.addEventListener("click", () => {

      openModal(
        "Video Call",
        "The OmniHub video-call interface is ready. Real video calling will require WebRTC and a backend service.",
        "Close"
      );

    });
  });

  // =========================
  // Audio Call
  // =========================

  $$("#audioBtn, [data-action='audio'], .audio-btn").forEach((button) => {
    button.addEventListener("click", () => {

      openModal(
        "Audio Call",
        "The OmniHub audio-call interface is ready. Real calling will be connected during the backend stage.",
        "Close"
      );

    });
  });

  // =========================
  // Business Account
  // =========================

  $$("#businessBtn, [data-action='business']").forEach((button) => {
    button.addEventListener("click", () => {

      openModal(
        "Business Account",
        "Create your OmniHub business profile and prepare products for selling.",
        "Continue"
      );

    });
  });

  // =========================
  // Student Account
  // =========================

  $$("#studentBtn, [data-action='student']").forEach((button) => {
    button.addEventListener("click", () => {

      openModal(
        "Student Account",
        "Create your OmniHub student profile and start learning courses.",
        "Continue"
      );

    });
  });

  // =========================
  // Lessons
  // =========================

  $$(".lesson").forEach((lesson) => {
    lesson.addEventListener("click", () => {

      const title =
        lesson.dataset.title ||
        lesson.textContent.trim() ||
        "Lesson";

      openModal(
        title,
        "This lesson area is ready. Course content and progress tracking will be added in the learning system.",
        "Start
