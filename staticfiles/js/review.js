nctionality
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    // Star rating interaction
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

    // Review submission
    document.getElementById('submitReview').addEventListener('click', () => {
        const comment = document.getElementById('reviewText').value.trim();
        
        if (!selectedRating) {
            alert('Please select a rating before submitting');
            return;
        }
        
        if (comment.length < 10) {
            alert('Please write a review with at least 10 characters');
            return;
        }

        const review = {
            rating: selectedRating,
            comment,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            user: 'Anonymous'
        };

        // Proper localStorage handling
        try {
            const storedData = localStorage.getItem('reviews') || '[]';
            const existingReviews = JSON.parse(storedData);
            const updatedReviews = [...existingReviews, review];
            localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        } catch (error) {
            console.error('Error saving review:', error);
            localStorage.setItem('reviews', JSON.stringify([review]));
        }

        // Clear form
        document.getElementById('reviewText').value = '';
        stars.forEach(s => {
            s.textContent = '☆';
            s.classList.remove('active');
        });
        selectedRating = 0;
        
        displayReviews();
    });

    // Display reviews with proper error handling
    function displayReviews() {
        const container = document.querySelector('.reviews-list');
        container.innerHTML = '';

        try {
            const storedData = localStorage.getItem('reviews') || '[]';
            const reviews = JSON.parse(storedData);

            reviews.reverse().forEach(review => {
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
                container.insertAdjacentHTML('afterbegin', reviewHTML);
            });
        } catch (error) {
            console.error('Error loading reviews:', error);
            container.innerHTML = '<p>Error loading reviews. Please try refreshing the page.</p>';
            localStorage.removeItem('reviews');
        }
    }

    // Initial load
    displayReviews();
});
