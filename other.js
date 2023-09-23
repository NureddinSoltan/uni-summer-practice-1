// Bopup box for the about section
const open = document.getElementById('open'),
modal_container = document.getElementById('modal-container'),
close = document.getElementById('close');

// Function to open the box
open.addEventListener("click", () => {
    modal_container.classList.add("show");
})

// Function to close the box
close.addEventListener("click", () => {
    modal_container.classList.remove("show");
});

// Close the box when clicking outside of the box
modal_container.addEventListener("click", (event) => {
    if (event.target === modal_container) {
        modal_container.classList.remove("show");
    }
});
