const darkModeToggleButton = document.getElementById("darkModeToggleButton");
const mainBody = document.querySelector("body");

function darkModeStatus() {
	if (darkModeToggleButton.innerHTML === "Dark mode") {
		darkModeToggleButton.innerHTML = "Light mode";
		darkModeToggleButton.classList.toggle("dark");
		localStorage.setItem("isDarkMode", true);
	} else { 
		darkModeToggleButton.innerHTML = "Dark mode";
		localStorage.setItem("isDarkMode", false);
	};
}

$(document).ready(function(){
	$(document).on("click", "#darkModeToggleButton", function () {
		mainBody.classList.toggle("dark");
		darkModeStatus();
	});
});

if (localStorage.getItem("isDarkMode") === "true") {
    mainBody.classList.toggle("dark");
	darkModeStatus();
	}