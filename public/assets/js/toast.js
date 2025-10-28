window.showToast = (msg, type = "success") => {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "2rem";
  toast.style.right = "2rem";
  toast.style.padding = "1rem 1.5rem";
  toast.style.borderRadius = ".5rem";
  toast.style.color = "#fff";
  toast.style.background = type === "success" ? "#16a34a" : "#dc2626";
  toast.style.zIndex = "1000";
  toast.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,.1)";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};
