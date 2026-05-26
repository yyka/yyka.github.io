function applyTheme(isDark, btn) {
	document.documentElement.classList.toggle('dark', isDark);

	if (btn) {
		btn.innerHTML = isDark ? "Light Mode" : "Dark Mode";
	}
}

function toggleTheme(btn) {
	const nextDarkState = localStorage.getItem('darkMode') !== 'true';
	localStorage.setItem('darkMode', nextDarkState);

	applyTheme(nextDarkState, btn);
}

document.onreadystatechange = () => {
	if (document.readyState === "interactive") {
		const btn = document.getElementById("dark-mode-button");
		const savedState = localStorage.getItem('darkMode') !== 'true';

		applyTheme(savedState, btn)

		if (btn) {
			btn.addEventListener('click', () => {
				toggleTheme(btn);
			});
		}
	}
}
