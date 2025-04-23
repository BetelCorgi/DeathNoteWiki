document.addEventListener('DOMContentLoaded', function() {
    var parent = document.querySelector('.splitview'),
        topPanel = parent.querySelector('.top'),
        handle = parent.querySelector('.handle'),
        skewHack = 0,
        delta = 0;

    // If the parent has .skewed class, set the skewHack var.
    if (parent.className.indexOf('skewed') != -1) {
        skewHack = 1000;
    }

    parent.addEventListener('mousemove', function(event) {
        // Get the delta between the mouse position and center point.
        delta = (event.clientX - window.innerWidth / 2) * 0.5;

        // Move the handle.
        handle.style.left = event.clientX + delta + 'px';

        // Adjust the top panel width.
        topPanel.style.width = event.clientX + skewHack + delta + 'px';
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Animación de la imagen
    const items = document.querySelectorAll(".anime-list li");
    items.forEach((el) => {
        const image = el.querySelector(".hover-img");
        const innerImage = el.querySelector(".hover-img img");
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x };
        const speed = 0.1;

        const xSet = (value) => {
            image.style.transform = `translateX(${value}px)`;
        };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
        });

        function updatePosition() {
            const dt = 1.0 - Math.pow(1.0 - speed, 1);
            pos.x += (mouse.x - pos.x) * dt;
            xSet(pos.x);
        }

        let oldx = 0;
        let lastCursorX = null;
        let cursorThreshold = 150;

        function mousemovemethod(e) {
            let direction = "";
            if (e.pageX < oldx && e.clientX <= lastCursorX - cursorThreshold) {
                direction = "left";
                lastCursorX = e.clientX;
                innerImage.style.transform = "rotate(-15deg)";
            } else if (e.pageX > oldx && e.clientX >= lastCursorX + cursorThreshold) {
                direction = "right";
                lastCursorX = e.clientX;
                innerImage.style.transform = "rotate(15deg)";
            }
            oldx = e.pageX;
        }

        document.addEventListener("mousemove", mousemovemethod);

        setInterval(updatePosition, 16); // aproximadamente 60 cuadros por segundo

        // Animación del cursor del mouse
        const ball = document.querySelector(".ball");
        const posBall = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouseBall = { x: posBall.x, y: posBall.y };
        const speedBall = 0.08;

        function moveBall() {
            const dt = 1.0 - Math.pow(1.0 - speedBall, 1);
            posBall.x += (mouseBall.x - posBall.x) * dt;
            posBall.y += (mouseBall.y - posBall.y) * dt;
            ball.style.transform = `translate(${posBall.x}px, ${posBall.y}px)`;
        }

        window.addEventListener("mousemove", (e) => {
            mouseBall.x = e.x;
            mouseBall.y = e.y;
        });

        setInterval(moveBall, 16); // aproximadamente 60 cuadros por segundo

        // Código para el efecto de scramble en el texto
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        items.forEach((el) => {
            el.onmouseenter = (event) => {
                const target_element = event.target.querySelector("h2");
                let iteration = 0;
                const interval = setInterval(() => {
                    target_element.innerText = target_element.innerText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return target_element.dataset.value[index];
                            }
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("");

                    if (iteration >= target_element.dataset.value.length) {
                        clearInterval(interval);
                    }
                    iteration += 1 / 3;
                }, 20);
            };
        });
    });
});
