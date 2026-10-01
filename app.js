const $=s=>document.querySelector(s);
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
