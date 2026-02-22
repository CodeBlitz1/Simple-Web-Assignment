const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const successMessage = document.getElementById("successMessage");
const toggleBtn = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});


const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });
});


function loadFeedback() {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackList.innerHTML = "";

    feedbacks.forEach(feedback => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${feedback.name}</strong> (${feedback.email})<br>${feedback.message}<hr>`;
        feedbackList.appendChild(div);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Name cannot be empty!");
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter valid email!");
        return;
    }

    const feedback = { name, email, message };
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    successMessage.textContent = "Feedback submitted successfully!";
    form.reset();
    loadFeedback();
});

loadFeedback();
