function darkMode() {

	function toggleMode(btn) {
		if (btn.innerHTML === "Dark mode") {
			btn.innerHTML = "Light mode";
			btn.classList.toggle("dark");
			localStorage.setItem("isDarkMode", true);
		} else {
			btn.innerHTML = "Dark mode";
			localStorage.setItem("isDarkMode", false);
		};
	}

	const darkModeBtn = document.getElementById("darkmodebtn");
	const mainBody = document.querySelector("body");

	if (localStorage.getItem("isDarkMode") === "true") {
		mainBody.classList.toggle("dark");
		toggleMode(darkModeBtn);
	}

	darkModeBtn.addEventListener('click', () => {
		mainBody.classList.toggle("dark");
		toggleMode(darkModeBtn);
	})

}

document.onreadystatechange = () => {
	if (document.readyState === "interactive") {
		darkMode()
	}
}
