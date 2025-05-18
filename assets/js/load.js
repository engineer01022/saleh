// On page load
document.body.classList.add('page-transition-in');

// On link click, add exit animation before navigating
document.querySelectorAll('a[href]').forEach(link => {
  const url = link.href;

  // Only handle internal links
  if (url && location.hostname === new URL(url).hostname) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.remove('page-transition-in');
      document.body.classList.add('page-transition-out');

      setTimeout(() => {
        window.location.href = url;
      }, 400); // Match the fadeOutSlide duration
    });
  }
});