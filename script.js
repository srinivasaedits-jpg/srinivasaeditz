const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

// Cursor movement
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

// Smooth ring animation
(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// Hover effect
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '48px';
    ring.style.height = '48px';
    ring.style.opacity = '0.8';
  });

  el.addEventListener('mouseleave', () => {
    ring.style.width = '32px';
    ring.style.height = '32px';
    ring.style.opacity = '0.5';
  });
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ================= FORM =================
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    console.log(data); // 🔥 ADD THIS (see error in console)

    if (response.ok) {
      submitBtn.textContent = "Message Sent ✅";
      form.reset();
    } else {
      submitBtn.textContent = "Error ❌";
      alert("Error: " + data.message);
    }

  } catch (error) {
    console.error(error); // 🔥 ADD THIS
    submitBtn.textContent = "Failed ❌";
    alert("Network error or API issue");
  }

  setTimeout(() => {
    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;
  }, 3000);
});