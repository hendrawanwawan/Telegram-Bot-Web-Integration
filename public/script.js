// Konfigurasi Telegram Botconst form = document.getElementById('messageForm');

const BOT_TOKEN = "7842031405:AAHuxK0UpqX7mMxqbJbJBUUYPzFgvqyAkXg";const notification = document.getElementById('notification');

const CHAT_ID = "1264374982";const imageInput = document.getElementById('image');

const imagePreview = document.getElementById('imagePreview');

const imageInput = document.getElementById('image');let selectedImage = null;

const imagePreview = document.getElementById('imagePreview');

let selectedImage = null;// Show notification

function showNotification(message, type = 'success') {

// Tampilkan notifikasi    notification.textContent = message;

function showNotification(message, type = 'success') {    notification.className = `notification ${type} show`;

    const notification = document.getElementById('notification');    

    notification.textContent = message;    setTimeout(() => {

    notification.className = `notification ${type} show`;        notification.classList.remove('show');

        }, 4000);

    setTimeout(() => {}

        notification.classList.remove('show');

    }, 4000);// Handle image selection and preview

}imageInput.addEventListener('change', function(e) {

    const file = e.target.files[0];

// Handle preview gambar    

imageInput.addEventListener('change', function(e) {    if (file) {

    const file = e.target.files[0];        // Check if file is an image

            if (!file.type.startsWith('image/')) {

    if (file) {            showNotification('❌ Please select a valid image file', 'error');

        // Cek apakah file adalah gambar            imageInput.value = '';

        if (!file.type.startsWith('image/')) {            return;

            showNotification('❌ Silakan pilih file gambar yang valid', 'error');        }

            imageInput.value = '';        

            return;        // Check file size (max 10MB)

        }        if (file.size > 10 * 1024 * 1024) {

                    showNotification('❌ Image size must be less than 10MB', 'error');

        // Cek ukuran file (max 10MB)            imageInput.value = '';

        if (file.size > 10 * 1024 * 1024) {            return;

            showNotification('❌ Ukuran gambar harus kurang dari 10MB', 'error');        }

            imageInput.value = '';        

            return;        selectedImage = file;

        }        

                // Show preview

        selectedImage = file;        const reader = new FileReader();

                reader.onload = function(event) {

        // Tampilkan preview            imagePreview.innerHTML = `

        const reader = new FileReader();<img src="${event.target.result}" alt="Preview">

        reader.onload = function(event) {<button type="button" class="remove-image">Remove Image</button>

            imagePreview.innerHTML = `            `;

                <img src="${event.target.result}" alt="Preview">imagePreview.classList.add('show');

                <button type="button" class="remove-image" onclick="removeImage()">Hapus Gambar</button>            

            `;            // Add remove image functionality

            imagePreview.classList.add('show');            imagePreview.querySelector('.remove-image').addEventListener('click', function() {

        };                imageInput.value = '';

        reader.readAsDataURL(file);                imagePreview.innerHTML = '';

    }                imagePreview.classList.remove('show');

});                selectedImage = null;

            });

// Hapus gambar        };

function removeImage() {        reader.readAsDataURL(file);

    imageInput.value = '';    }

    imagePreview.innerHTML = '';});

    imagePreview.classList.remove('show');

    selectedImage = null;// Handle form submission

}form.addEventListener('submit', async (e) => {

    e.preventDefault();

// Fungsi kirim pesan ke Telegram    

async function kirim() {    const submitBtn = form.querySelector('.submit-btn');

    const name = document.getElementById('name').value;    const btnText = submitBtn.querySelector('.btn-text');

    const pesan = document.getElementById('pesan').value;    const btnIcon = submitBtn.querySelector('.btn-icon');

    const btn = document.querySelector('.submit-btn');    

    const btnText = btn.querySelector('.btn-text');    // Create FormData for file upload

    const btnIcon = btn.querySelector('.btn-icon');    const formData = new FormData();

        formData.append('name', document.getElementById('name').value);

    // Validasi input    formData.append('message', document.getElementById('message').value);

    if (!name || !pesan) {    

        showNotification('❌ Nama dan pesan harus diisi!', 'error');    // Add image if selected

        return;    if (selectedImage) {

    }        formData.append('image', selectedImage);

        }

    // Format pesan    

    const text = `📨 *Pesan Baru dari Website*\n━━━━━━━━━━━━━━━━━━━━\n👤 *Nama:* ${name}\n💬 *Pesan:*\n${pesan}\n━━━━━━━━━━━━━━━━━━━━\n⏰ Waktu: ${new Date().toLocaleString('id-ID')}`;    // Disable button and show loading

        submitBtn.disabled = true;

    // Disable button dan tampilkan loading    submitBtn.classList.add('loading');

    btn.disabled = true;    btnText.textContent = 'Sending...';

    btnText.textContent = 'Mengirim...';    btnIcon.textContent = '⏳';

    btnIcon.textContent = '⏳';    

        try {

    try {        const response = await fetch('/api/send-message', {

        if (selectedImage) {            method: 'POST',

            // Kirim gambar dengan caption            body: formData

            await kirimGambar(text);        });

        } else {        

            // Kirim teks saja        const data = await response.json();

            await kirimTeks(text);        

        }        if (data.success) {

                    showNotification('✅ Message sent successfully to Telegram!', 'success');

        showNotification('✅ Pesan berhasil dikirim ke Telegram!', 'success');            form.reset();

                    imagePreview.innerHTML = '';

        // Reset form            imagePreview.classList.remove('show');

        document.getElementById('name').value = '';            selectedImage = null;

        document.getElementById('pesan').value = '';        } else {

        removeImage();            showNotification('❌ ' + (data.error || 'Failed to send message'), 'error');

                }

    } catch (error) {    } catch (error) {

        console.error('Error:', error);        console.error('Error:', error);

        showNotification('❌ Gagal mengirim pesan. Coba lagi.', 'error');        showNotification('❌ Network error. Please check your connection.', 'error');

    } finally {    } finally {

        // Reset button        // Reset button

        btn.disabled = false;        submitBtn.disabled = false;

        btnText.textContent = 'Kirim';        submitBtn.classList.remove('loading');

        btnIcon.textContent = '🚀';        btnText.textContent = 'Send to Telegram';

    }        btnIcon.textContent = '🚀';

}    }

});

// Kirim teks ke Telegram

async function kirimTeks(text) {// Add input validation feedback

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;const inputs = form.querySelectorAll('input[type="text"], textarea');

    inputs.forEach(input => {

    const response = await fetch(url, {    input.addEventListener('blur', function() {

        method: 'POST',        if (this.value.trim() === '') {

        headers: {            this.style.borderColor = '#f44336';

            'Content-Type': 'application/json'        } else {

        },            this.style.borderColor = '#4caf50';

        body: JSON.stringify({        }

            chat_id: CHAT_ID,    });

            text: text,    

            parse_mode: 'Markdown'    input.addEventListener('focus', function() {

        })        this.style.borderColor = '#667eea';

    });    });

    });

    if (!response.ok) {
        throw new Error('Gagal mengirim pesan');
    }
    
    return await response.json();
}

// Kirim gambar ke Telegram
async function kirimGambar(caption) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
    
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', selectedImage);
    formData.append('caption', caption);
    formData.append('parse_mode', 'Markdown');
    
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error('Gagal mengirim gambar');
    }
    
    return await response.json();
}

// Validasi input saat mengetik
document.getElementById('name').addEventListener('focus', function() {
    this.style.borderColor = '#667eea';
});

document.getElementById('pesan').addEventListener('focus', function() {
    this.style.borderColor = '#667eea';
});

document.getElementById('name').addEventListener('blur', function() {
    if (this.value.trim() === '') {
        this.style.borderColor = '#f44336';
    } else {
        this.style.borderColor = '#4caf50';
    }
});

document.getElementById('pesan').addEventListener('blur', function() {
    if (this.value.trim() === '') {
        this.style.borderColor = '#f44336';
    } else {
        this.style.borderColor = '#4caf50';
    }
});
