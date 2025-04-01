// searched up that navigator.doNotTrack is used for most browsers
// navigator.globalPrivacyControl (GPC) is essentially DNT for firefox 
if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true) {
    console.log("Do Not Track is enabled. Disabling tracking features.");

    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear cookies properly by setting their expiration to the past
    document.cookie.split(";").forEach(cookie => {
        const [key] = cookie.split("=");
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    // Prevent further execution of banner and modal logic
} else {
    console.log("Do Not Track is not enabled. Proceeding with normal behavior.");
}

// Clear Data Button Logic
document.getElementById("clear-data-button").addEventListener("click", function () {
	// Clear localStorage
	localStorage.clear();
	console.log("localStorage cleared.");

	// Clear sessionStorage
	sessionStorage.clear();
	console.log("sessionStorage cleared.");

	// Clear cookies properly by setting their expiration to the past
	document.cookie.split(";").forEach(cookie => {
		const [key] = cookie.split("=");
		document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	});
	console.log("Cookies cleared.");

	alert("All stored data has been cleared.");
});

/**
 * Displays the top banner by removing the 'hide' class from it.
 * Uses a short delay to ensure the transition is triggered.
 */
function showTopBanner() {
    if (sessionStorage.getItem('closeTopBanner') === 'true') {
        return; // returns nothing so it wont do anything
    }

    // will run if the IF statement is false
	var banner = document.getElementById("top-banner");
	banner.classList.remove("hide");
	setTimeout(function () {
		banner.classList.add("show");
	}, 50); // Delay to ensure the transition is triggered
}

/**
 * Displays the footer banner by removing the 'hide' class from it.
 */
function showFooterBanner() {
    // finds the specific cookie
    if (document.cookie.split('; ').find(row => row.startsWith('footerBannerClosed='))?.split('=')[1] === 'true') {
        console.log("Footer banner cookie exists and is set to true!");
        return;
    }
    

	document.getElementById("footer-banner").classList.remove("hide");
}

/**
 * Displays the modal by removing the 'hide' class from it.
 */
function showModal() {
    // Used to check if there is localStorage
    if (localStorage.getItem("modalClosed") === "true") {
        return; // returns nothing so it wont do anything
    }

    // will run if the IF statement is false
	document.getElementById("modal").classList.remove("hide");
}

/**
 * Hides the modal by adding the 'hide' class to it.
 */
function closeModal() {
    // flag
    localStorage.setItem("modalClosed", 'true');

	document.getElementById("modal").classList.add("hide");
}

/**
 * Hides the top banner by adding the 'hide' class to it.
 */
function closeTopBanner() {
    // flag
    sessionStorage.setItem("closeTopBanner", "true");

	document.getElementById("top-banner").classList.add("hide");
}

/**
 * Hides the footer banner by adding the 'hide' class to it.
 */
function closeFooterBanner() {
    // no expiration date = session cookie
    document.cookie = "footerBannerClosed=true; path=/";

	document.getElementById("footer-banner").classList.add("hide");
}

// Event listeners to close the modal, top banner, and footer banner when 'x' is clicked
document.getElementById("modal").addEventListener("click", closeModal);
document.getElementById("top-banner").addEventListener("click", closeTopBanner);
document.getElementById("footer-banner").addEventListener("click", closeFooterBanner);

// Show the footer banner after a delay of 1 second
setTimeout(showFooterBanner, 1000);

// Show the top banner after a delay of 2 seconds
setTimeout(showTopBanner, 2000);

// Show the modal after a delay of 4 seconds
setTimeout(showModal, 4000);
