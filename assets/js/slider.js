function moveSlide(direction, sliderId) {
  const sliderContainer = document.getElementById(sliderId);
  const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
  const sliderItems = sliderContainer.querySelectorAll('.slider-item');
  const totalItems = sliderItems.length;

  // Get the container width and calculate how many items can fit based on screen size
  const containerWidth = sliderContainer.getBoundingClientRect().width;
  const itemWidth = sliderItems[0].getBoundingClientRect().width;

  console.log("Container width: ", containerWidth);  // Log to check
  console.log("Item width: ", itemWidth);  // Log to check

  // Calculate how many items fit in the container
  const itemsToShow = Math.floor(containerWidth / itemWidth); // Number of items that can be shown based on container width

  console.log("Items to show: ", itemsToShow);  // Log to check

  let currentIndex = parseInt(sliderContainer.dataset.currentIndex) || 0;

  // Update currentIndex based on direction
  currentIndex -= direction;

  // Ensure the index is within bounds
  if (currentIndex < 0) {
    currentIndex = totalItems - itemsToShow;
  } else if (currentIndex + itemsToShow > totalItems) {
    currentIndex = 0;
  }

  // Update the slider position and apply transitions to the slider wrapper and items
  sliderWrapper.style.transition = 'transform 0.3s ease'; // Apply transition to the wrapper
  sliderWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Fade out the hidden items and fade in the visible items
  sliderItems.forEach((item, index) => {
    if (index >= currentIndex && index < currentIndex + itemsToShow) {
      item.style.transition = 'opacity 0.3s ease';
      item.style.opacity = 1; // Visible items
    } else {
      item.style.transition = 'opacity 0.3s ease';
      item.style.opacity = 0.5; // Hidden items (faded out)
    }
  });

  // Save the new index to the slider's data attribute
  sliderContainer.dataset.currentIndex = currentIndex;
}

// Optional: Add an event listener to adjust items based on window resize
window.addEventListener('resize', function () {
  const sliders = document.querySelectorAll('.slider-container');
  sliders.forEach(slider => {
    moveSlide(0, slider.id); // Call the moveSlide with direction 0 to re-calculate position
  });
});


