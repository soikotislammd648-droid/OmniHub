// OmniHub - Main App JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("OmniHub app loaded");

  // -----------------------------
  // Demo profile / Sign in
  // -----------------------------
  const savedName = localStorage.getItem("omnihub_name");

  function showWelcome(name) {
    alert(`Welcome, ${name}! Your OmniHub demo profile is saved.`);
  }

  function signIn() {
    const name = prompt("Enter your name:");

    if (!name || !name.trim()) {
      return;
    }

    const cleanName = name.trim();
    localStorage.setItem("omnihub_name", cleanName);
    showWelcome(cleanName);
  }

  // -----------------------------
  // Sign in buttons
  // -----------------------------
  document.querySelectorAll(
    "#signInBtn, .sign-in-btn, [data-action='signin']"
  ).forEach((button) => {
    button.addEventListener("click", signIn);
  });

  // -----------------------------
  // New message
  // -----------------------------
  document.querySelectorAll(
    "[data-action='message'], .message-btn"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        "Messaging UI is ready for the frontend.\n\n" +
        "Real messaging will require a backend such as Supabase or Firebase."
      );
    });
  });

  // -----------------------------
  // Video call
  // -----------------------------
  document.querySelectorAll(
    "[data-action='video'], .video-btn"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        "Video call interface is ready.\n\n" +
        "Real video calling will require WebRTC/backend integration."
      );
    });
  });

  // -----------------------------
  // Audio call
  // -----------------------------
  document.querySelectorAll(
    "[data-action='audio'], .audio-btn"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        "Audio call interface is ready.\n\n" +
        "Real audio calling will require backend/WebRTC integration."
      );
    });
  });

  // -----------------------------
  // Business account
  // -----------------------------
  document.querySelectorAll(
    "[data-action='business'], .business-btn"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        "Business Account\n\n" +
        "Create your business profile to sell products on OmniHub."
      );
    });
  });

  // -----------------------------
  // Student account
  // -----------------------------
  document.querySelectorAll(
    "[data-action='student'], .student-btn"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        "Student Account\n\n" +
        "Create your student profile and start learning on OmniHub."
      );
    });
  });

  // -----------------------------
  // Shopping cart
  // -----------------------------
  let cart = JSON.parse(localStorage.getItem("omnihub_cart") || "[]");

  function saveCart() {
    localStorage.setItem("omnihub_cart", JSON.stringify(cart));
  }

  document.querySelectorAll(
    "[data-action='cart'], .add-cart, .add-to-cart"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      const product =
        button.dataset.product ||
        button.closest("[data-product]")?.dataset.product ||
        "Demo Product";

      cart.push(product);
      saveCart();

      alert(`${product} added to your cart.`);
    });
  });

  // -----------------------------
  // Draw / Canvas
  // -----------------------------
  const canvas = document.querySelector(
    "#drawCanvas, canvas[data-draw]"
  );

  if (canvas) {
    const ctx = canvas.getContext("2d");

    let drawing = false;

    function position(event) {
      const rect = canvas.getBoundingClientRect();

      const touch =
        event.touches && event.touches.length
          ? event.touches[0]
          : event;

      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    function startDrawing(event) {
      drawing = true;

      const p = position(event);

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);

      event.preventDefault();
    }

    function draw(event) {
      if (!drawing) return;

      const p = position(event);

      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      event.preventDefault();
    }

    function stopDrawing() {
      drawing = false;
      ctx.closePath();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing, {
      passive: false
    });

    canvas.addEventListener("touchmove", draw, {
      passive: false
    });

    canvas.addEventListener("touchend", stopDrawing);
  }

  // -----------------------------
  // Clear drawing
  // -----------------------------
  document.querySelectorAll(
    "#clearDrawing, .clear-drawing"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    });
  });

  // -----------------------------
  // Save drawing
  // -----------------------------
  document.querySelectorAll(
    "#saveDrawing, .save-drawing"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      if (!canvas) return;

      const link = document.createElement("a");

      link.download = "omnihub-drawing.png";
      link.href = canvas.toDataURL("image/png");

      link.click();
    });
  });

  // -----------------------------
  // Welcome existing user
  // -----------------------------
  if (savedName) {
    console.log(`Welcome back, ${savedName}!`);
  }
});const $=s=>document.querySelector(s);
const modal=$("#modal"), title=$("#modalTitle"), text=$("#modalText"), input=$("#nameInput");
function openModal(t,m){title.textContent=t;text.textContent=m;modal.classList.add("show");input.focus()}
$("#closeModal").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
$("#loginBtn").onclick=()=>openModal("Sign in to OmniHub","Enter your name to preview the account experience.");
$("#newChatBtn").onclick=$("#chatBtn").onclick=()=>openModal("New message","Messaging UI is ready for the frontend. Connect a realtime backend such as WebSocket/Firebase/Supabase for real accounts and messages.");
$("#videoBtn").onclick=()=>openModal("Video call","The button is ready. Real video calls require WebRTC plus a signaling/backend service.");
$("#audioBtn").onclick=()=>openModal("Audio call","The button is ready. Connect WebRTC or a calling provider for real audio calls.");
$("#businessBtn").onclick=()=>openModal("Business account","Business profiles, products, orders and payments should be connected to a secure backend.");
$("#studentBtn").onclick=()=>openModal("Student account","Student profiles, course progress and certificates should be stored in a backend.");
document.querySelectorAll(".lesson").forEach(b=>b.onclick=()=>openModal("Course","Course interface ready. Add your lessons, videos, quizzes and progress tracking."));
document.querySelectorAll(".addcart").forEach(b=>b.onclick=()=>{b.textContent="Added ✓";setTimeout(()=>b.textContent="Add to cart",1000)});
$("#modalAction").onclick=()=>{const n=input.value.trim(); if(n){localStorage.setItem("omniName",n);openModal("Welcome, "+n+"!","Your local demo profile is saved in this browser.");}};

const canvas=$("#canvas"),ctx=canvas.getContext("2d");let drawing=false;
function pos(e){const r=canvas.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return{x:(p.clientX-r.left)*canvas.width/r.width,y:(p.clientY-r.top)*canvas.height/r.height}}
function start(e){drawing=true;const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);e.preventDefault()}
function move(e){if(!drawing)return;const p=pos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle=$("#color").value;ctx.lineWidth=$("#size").value;ctx.lineCap="round";ctx.stroke();e.preventDefault()}
function end(){drawing=false}
canvas.addEventListener("pointerdown",start);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",end);canvas.addEventListener("pointerleave",end);
$("#clearCanvas").onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);
$("#saveDrawing").onclick=()=>{const a=document.createElement("a");a.download="omnihub-drawing.png";a.href=canvas.toDataURL("image/png");a.click()};
