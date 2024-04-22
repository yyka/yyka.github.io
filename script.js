const darkMode = document.getElementById("darkMode");

function darkmodeTextToggle() {
	if (darkMode.innerHTML === "Dark mode") {
		darkMode.innerHTML = "Light mode";
	} else { 
		darkMode.innerHTML = "Dark mode";
	};
}
	
const bodyDark = document.querySelector("body");
	darkMode.addEventListener("click", () => {
		bodyDark.classList.toggle("dark");
		darkmodeTextToggle();
	});
	