const darkModeToggleButton = document.getElementById("darkModeToggleButton");

function darkmodeTextToggle() {
	if (darkModeToggleButton.innerHTML === "Dark mode") {
		darkModeToggleButton.innerHTML = "Light mode";
		localStorage.setItem("isDarkMode", true);
	} else { 
		darkModeToggleButton.innerHTML = "Dark mode";
		localStorage.setItem("isDarkMode", false);
	};
}

const mainBody = document.querySelector("body");
	darkModeToggleButton.addEventListener("click", () => {
		mainBody.classList.toggle("dark");
		darkmodeTextToggle();
		
	});

if (localStorage.getItem("isDarkMode") === "true") {
    mainBody.classList.toggle("dark");
	darkmodeTextToggle();
} 