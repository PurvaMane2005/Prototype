// scripts.js
document.querySelectorAll('#india-map path').forEach(state => {
    state.addEventListener('mouseover', function() {
        // Custom behavior on hover
        console.log(this.id + ' is hovered');
    });

    state.addEventListener('click', function(event) {
        event.preventDefault();
        const stateUrl = this.parentElement.href.baseVal;
        window.location.href = stateUrl;
    });
});