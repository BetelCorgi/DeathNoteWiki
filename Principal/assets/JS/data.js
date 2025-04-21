const slider = document.querySelector('.slider');

function activate(e) {
    const items = document.querySelectorAll('.item');
    e.target.matches('.next') && slider.append(items[0])
    e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

// Función para detectar si el servicio está en el viewport (pantalla)
// Función para detectar si el elemento está en el viewport (pantalla)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Deja de observar cuando ya se mostró
        }
    });
}, {
    threshold: 0.2 // Solo cuando el 20% del elemento ya entró en la pantalla
});

document.querySelectorAll('.col-md-4').forEach(item => {
    observer.observe(item);
});

var navIzq = $(".izquierda");
var navDer = $(".derecha");
var title = $(".floating-container-title");
var izqImg = $(".izquierda > img");
var derImg = $(".derecha > img");

var limit = 1605;
if($window.innerWidth > 1900) {
    limit = 1335;
}

$(window).scroll(function () {

    console.log($(this).scrollTop());
    if ($(this).scrollTop() > 145 && $(this).scrollTop() < limit) {
        navIzq.addClass("fixed-floating-nav");
        navDer.addClass("fixed-floating-nav");
    } else {
        navIzq.removeClass("fixed-floating-nav");
        navDer.removeClass("fixed-floating-nav");
    }

    if ($(this).scrollTop() > limit) {
        navIzq.addClass("relative-floating-nav");
        navDer.addClass("relative-floating-nav");
        izqImg.addClass("relative-floating-img");
        derImg.addClass("relative-floating-img");
    }else {
        navIzq.removeClass("relative-floating-nav");
        navDer.removeClass("relative-floating-nav");
        izqImg.removeClass("relative-floating-img");
        derImg.removeClass("relative-floating-img");
    }





    if ($(this).scrollTop() > 145) {
        title.addClass("fixed-floating-title");
    } else {
        title.removeClass("fixed-floating-title");
    }
});