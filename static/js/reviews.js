document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  let selectedRating = 0;

  // Handle star rating selection
  stars.forEach(star => {
      star.addEventListener('click', () => {
          selectedRating = parseInt(star.dataset.value);
          stars.forEach(s => {
              const value = parseInt(s.dataset.value);
              s.textContent = value <= selectedRating ? '★' : '☆';
              s.classList.toggle('active', value <= selectedRating);
          });
      });
  });

  // Submit review to backend
  document.getElementById('submitReview').addEventListener('click', async () => {
      const comment = document.getElementById('reviewText').value.trim();

      if (!selectedRating) {
          alert('Please select a rating before submitting');
          return;
      }
      
      if (comment.length < 10) {
          alert('Please write a review with at least 10 characters');
          return;
      }

      try {
          const response = await fetch('/submit-review/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCSRFToken()
              },
              body: JSON.stringify({ rating: selectedRating, comment })
          });

          const data = await response.json();
          if (response.ok) {
              alert('Review submitted successfully');
              document.getElementById('reviewText').value = '';
              selectedRating = 0;
              stars.forEach(s => {
                  s.textContent = '☆';
                  s.classList.remove('active');
              });
              fetchReviews();
          } else {
              alert(data.error || 'Error submitting review');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });

  // Fetch and display reviews
  async function fetchReviews() {
      try {
          const response = await fetch('/fetch-reviews/');
          const data = await response.json();

          const container = document.querySelector('.reviews-list');
          container.innerHTML = '';

          data.reviews.forEach(review => {
              const starsHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
              const reviewHTML = `
                  <div class="review-card">
                      <div class="review-header">
                          <div>
                              <span class="review-user">${review.user}</span>
                              <span class="review-date">${review.date}</span>
                          </div>
                          <div class="review-rating">${starsHTML}</div>
                      </div>
                      <div class="review-content">${review.comment}</div>
                  </div>
              `;
              container.insertAdjacentHTML('beforeend', reviewHTML);
          });
      } catch (error) {
          console.error('Error fetching reviews:', error);
      }
  }

  // Get CSRF Token
  function getCSRFToken() {
      return document.cookie.split('; ')
          .find(row => row.startsWith('csrftoken'))
          ?.split('=')[1];
  }

  // Load reviews initially
  fetchReviews();
});
