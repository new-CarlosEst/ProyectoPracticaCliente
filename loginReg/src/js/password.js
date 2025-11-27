export function initPasswordToggle() {
    // Find all password toggle containers
    const toggleContainers = document.querySelectorAll('.password-container');

    toggleContainers.forEach(container => {
        const input = container.querySelector('input');
        const openEye = container.querySelector('.eye-open');
        const closedEye = container.querySelector('.eye-closed');

        if (input && openEye && closedEye) {
            // Initial state: closed eye visible, open eye hidden
            openEye.style.display = 'none';
            closedEye.style.display = 'block';

            const toggleVisibility = () => {
                if (input.type === 'password') {
                    input.type = 'text';
                    openEye.style.display = 'block';
                    closedEye.style.display = 'none';
                } else {
                    input.type = 'password';
                    openEye.style.display = 'none';
                    closedEye.style.display = 'block';
                }
            };

            openEye.addEventListener('click', toggleVisibility);
            closedEye.addEventListener('click', toggleVisibility);
        }
    });
}
