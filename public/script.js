const form = document.getElementById('messageForm');
const notification = document.getElementById('notification');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
let selectedImage = null;

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Handle image selection and preview
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            showNotification('❌ Please select a valid image file', 'error');
            imageInput.value = '';
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('❌ Image size must be less than 10MB', 'error');
            imageInput.value = '';
            return;
        }
        
        selectedImage = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.innerHTML = `
                <img src="${event.target.result}" alt="Preview">
                <button type="button" class="remove-image">Remove Image</button>
            `;
            imagePreview.classList.add('show');
            
            // Add remove image functionality
            imagePreview.querySelector('.remove-image').addEventListener('click', function() {
                imageInput.value = '';
                imagePreview.innerHTML = '';
                imagePreview.classList.remove('show');
                selectedImage = null;
            });
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('message', document.getElementById('message').value);
    
    // Add image if selected
    if (selectedImage) {
        formData.append('image', selectedImage);
    }
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    btnText.textContent = 'Sending...';
    btnIcon.textContent = '⏳';
    
    try {
        const response = await fetch('/api/send-message', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Message sent successfully to Telegram!', 'success');
            form.reset();
            imagePreview.innerHTML = '';
            imagePreview.classList.remove('show');
            selectedImage = null;
        } else {
            showNotification('❌ ' + (data.error || 'Failed to send message'), 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('❌ Network error. Please check your connection.', 'error');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        btnText.textContent = 'Send to Telegram';
        btnIcon.textContent = '🚀';
    }
});

// Add input validation feedback
const inputs = form.querySelectorAll('input[type="text"], textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '#4caf50';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#667eea';
    });
});
