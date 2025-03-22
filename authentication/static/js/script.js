// Initialize Google Map
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false
    });
}

// Add location functionality
document.getElementById('addLocation').addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.className = 'location-item';
    newItem.innerHTML = `
        <input type="text" placeholder="🏪 Store Location">
        <button type="button" class="remove-btn">×</button>
    `;
    document.getElementById('locationsList').appendChild(newItem);
});

// Remove location functionality
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profileButton = document.getElementById("profileButton");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileButton) {
        profileButton.addEventListener("click", function () {
            profileDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!profileButton.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.remove("show");
            }
        });
    }
});
