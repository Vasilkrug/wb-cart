export const hideBlock = (target, container, displayOnVisible) => {
    target.classList.toggle('arrow-hidden');
    if (target.classList.contains('arrow-hidden')) {
        target.style.transform = 'rotate(180deg)';
        container.style.display = 'none';
    } else {
        target.style.transform = 'rotate(0)';
        container.style.display = displayOnVisible;
    }
};