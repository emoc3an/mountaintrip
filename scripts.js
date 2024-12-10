// Масштаб сторінки
window.addEventListener('load', () => {
    document.body.style.zoom = "79%";
});

// Налаштування каруселі
window.addEventListener('load', () => {
    const container = document.querySelector('.carousel-container');
    const btnLeft = document.querySelector('.scroll-left');
    const btnRight = document.querySelector('.scroll-right');

    if (container && btnLeft && btnRight) {
        // Визначаємо ширину картки туру
        const tourWidth = document.querySelector('.tour').offsetWidth + 96;

        // Прокрутка вліво
        btnLeft.addEventListener('click', () => {
            container.scrollBy({ left: -tourWidth, behavior: 'smooth' });
        });

        // Прокрутка вправо
        btnRight.addEventListener('click', () => {
            container.scrollBy({ left: tourWidth, behavior: 'smooth' });
        });
    }
});

// Налаштування галереї зображень
let currentIndex = 0;
const thumbnails = document.querySelectorAll('.thumbnail-grid img');
const largeImage = document.getElementById('largeImage');

function showImage(imageElement) {
    if (largeImage && imageElement) {
        const tempSrc = largeImage.src;
        largeImage.src = imageElement.src;
        imageElement.src = tempSrc;

        // Оновити активне зображення
        thumbnails.forEach((thumb) => thumb.classList.remove('active'));
        imageElement.classList.add('active');

        // Оновити індекс
        currentIndex = Array.from(thumbnails).indexOf(imageElement);
    }
}

function prevImage() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    swapWithLarge(thumbnails[currentIndex]);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    swapWithLarge(thumbnails[currentIndex]);
}

function swapWithLarge(thumbnail) {
    if (largeImage && thumbnail) {
        const tempSrc = largeImage.src;
        largeImage.src = thumbnail.src;
        thumbnail.src = tempSrc;

        // Оновити активну мініатюру
        thumbnails.forEach((thumb) => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    }
}

// Обробка форми заявки з EmailJS
emailjs.init("ВАШ_USER_ID");

document.querySelector(".submit-button").addEventListener("click", function(e) {
    e.preventDefault(); // Забороняємо перезавантаження сторінки

    const name = document.querySelector(".input-box[placeholder='Ім’я']").value;
    const phone = document.querySelector(".input-box[placeholder='Телефон']").value;
    const email = document.querySelector(".input-box[placeholder='Email']").value;

    if (!name || !phone || !email) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    const params = {
        from_name: name,
        phone: phone,
        email: email
    };

    emailjs.send("ВАШ_SERVICE_ID", "ВАШ_TEMPLATE_ID", params)
        .then((response) => {
            alert("Заявку успішно відправлено!");
        }, (error) => {
            alert("Помилка при відправленні заявки. Спробуйте пізніше.");
        });
});
