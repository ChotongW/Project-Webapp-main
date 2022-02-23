function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function conFirm() {
    if (confirm("Confirm Booking?")) {
        alert("You Booking Success!");
    } else {
        alert("You Booking Failure!");
    }

}