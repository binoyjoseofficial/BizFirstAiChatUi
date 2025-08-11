class MessageHandler {
    showError(container, message) {
        container.querySelectorAll('.error-toast').forEach(e => e.remove());
        let error = document.createElement('div');
        error.classList.add('error-toast');
        error.textContent = message; // Use textContent instead of innerHTML
        container.appendChild(error);
        error.getBoundingClientRect();
        error.style.transition = 'opacity .5s ease-in-out 4s';
        error.style.opacity = 0;
        setTimeout(() => error.remove(), 5000);
    }

    showSuccess(container, message) {
        container.querySelectorAll('.success-toast').forEach(e => e.remove());
        let success = document.createElement('div');
        success.classList.add('success-toast');
        success.textContent = message; // Use textContent instead of innerHTML
        container.appendChild(success);
        success.getBoundingClientRect();
        success.style.transition = 'opacity .5s ease-in-out 4s';
        success.style.opacity = 0;
        setTimeout(() => success.remove(), 5000);
    }
}