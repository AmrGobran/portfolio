// theme
const toggleBtn = document.querySelector("button#toggle-btn");
const icon = document.getElementById("icon");
const html = document.documentElement;
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const setIcon = (isDark) => {
	icon.innerHTML = isDark
		? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>`
		: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>`;
};

const isInitiallyDark = storedTheme === "dark" || (!storedTheme && prefersDark);
if (isInitiallyDark) html.classList.add("dark");
setIcon(isInitiallyDark);

toggleBtn.addEventListener("click", () => {
	html.classList.toggle("dark");
	const isDark = html.classList.contains("dark");
	setIcon(isDark);
	localStorage.setItem("theme", isDark ? "dark" : "light");
});

// smooth scroll
// desktop
const sections = document.querySelectorAll(".section");
let isScrolling = false;
let currentIndex = 0;

function scrollToSection(index) {
	if (index < 0 || index >= sections.length) return;
	isScrolling = true;
	currentIndex = index;
	sections[index].scrollIntoView({ behavior: "smooth" });

	setTimeout(() => {
		isScrolling = false;
	}, 400);
}

window.addEventListener(
	"wheel",
	(e) => {
		e.preventDefault();
		if (isScrolling) return;
		if (e.deltaY > 0) scrollToSection(currentIndex + 1), console.log(currentIndex);
		if (e.deltaY < 0) scrollToSection(currentIndex - 1), console.log(currentIndex);
	},
	{ passive: false }
);

// smooth scroll
// mobile
/* have some issues with normal scrolling */
// let touchStartY = 0;
// let touchEndY = 0;

// window.addEventListener("touchstart", (e) => {
// 	touchStartY = e.changedTouches[0].clientY;
// });

// window.addEventListener("touchend", (e) => {
// 	touchEndY = e.changedTouches[0].clientY;
// 	handleSwipe();
// });

// function handleSwipe() {
// 	if (isScrolling) return;
// 	const swipeThreshold = 50;
// 	const deltaY = touchStartY - touchEndY;
// 	if (deltaY > swipeThreshold) scrollToSection(currentIndex + 1);
// 	if (deltaY < swipeThreshold) scrollToSection(currentIndex - 1);
// }

// form validation
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const name = form.name.value.trim();
	const email = form.email.value.trim();
	const message = form.message.value.trim();

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	if (!name || !email || !message) {
		alert("Please fill in all the fields.");
		return;
	}

	if (!validateEmail(email)) {
		alert("Please enter a valid Email.");
		return;
	}

	alert("Thanks! Your message has been sent.");
	form.submit();

	setTimeout(() => {
		form.reset();
	}, 500);
});
