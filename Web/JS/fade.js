document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[popovertarget]');

  buttons.forEach(btn => {
    const targetId = btn.getAttribute('popovertarget');
    const popover = document.getElementById(targetId);

    if (!popover) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Optional: close other popovers first
      document.querySelectorAll('.popover.show').forEach(p => {
        if (p !== popover) p.classList.remove('show');
      });

      popover.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!popover.contains(e.target) && e.target !== btn) {
        popover.classList.remove('show');
      }
    });
  });
});
