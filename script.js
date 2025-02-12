



$(document).ready(function () {
    $.getJSON("wallpapers.json", function (data) {
        $.each(data, function (index, img) {
            $("#galeria").append(`<div class="img-container video-link ${img.style}" video-data="${img.video}">
                <div class="loader">
                    <div class="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <img style="display: none" src="${img.path}" alt="${img.name}" title="${img.name}">
            </div>`);
        });
        var imgs = document.querySelectorAll('#galeria img')

        function loaded() {
            setTimeout(() => {
                const loader = this.previousElementSibling;
                loader.style.display = 'none';
                this.style.display = 'block';
            }, 500)
        }
        imgs.forEach((img) => {
            if (img.complete) {
                loaded()
            } else {
                img.addEventListener('load', loaded)
            }
        })
        // Hide loader when image is fully loaded
    }).fail(function () {
        console.error("Error al cargar el JSON.");
    });

    $(".nav-elem").each(function () {
        $(this).on("click", function () {
            $(".nav-elem").removeClass("active");
            $(this).addClass("active");
        });
    });

    function applyFilter(filterClass) {

        $("#hamburger-menu").addClass("menu-hidden").removeClass("menu-visible");

        $("#galeria div.img-container").each(function () {
            $(this).removeClass("img-active");
        });
        $("#galeria div.img-container").each(function () {
            if ($(this).hasClass(filterClass ?? "")) {
                $(this).addClass("img-active");
            } else {
                $(this).removeClass("img-active");
            }
        });
    }

    $("#light-images").on("click", function () { applyFilter("light"); });
    $("#dark-images").on("click", function () { applyFilter("dark"); });
    $("#midnight-images").on("click", function () { applyFilter("midnight"); });
    $("#all-images").on("click", function () {
        $("#hamburger-menu").addClass("menu-hidden").removeClass("menu-visible");

        $("#galeria div.img-container").each(function () {
            $(this).removeClass("img-active");
        });
    });

    // Menu hamburguesa
    $("#hb-light-images").on("click", function () { applyFilter("light"); });
    $("#hb-dark-images").on("click", function () { applyFilter("dark"); });
    $("#hb-midnight-images").on("click", function () { applyFilter("midnight"); });
    $("#hb-all-images").on("click", function () {
        $("#hamburger-menu").addClass("menu-hidden").removeClass("menu-visible");

        $("#galeria div.img-container").each(function () {
            $(this).removeClass("img-active");
        });
    });

    $("#hb-close").on("click", function () {
        $("#hamburger-menu").addClass("menu-hidden").removeClass("menu-visible");
    })



    // Evitar el evento por defecto de la etiqueta "a" y mostrar el video en un popup
    $(document).on("click", ".img-active.video-link", function (e) {

        e.preventDefault();
        const videoUrl = $(this).attr("video-data");
        $("body").append(`
                <div id="video-popup">
                    <div class="video-overlay"></div>
                    <div class="video-container">
                    
                        <iframe src="${videoUrl}" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        frameborder="0"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                        </iframe>
                        <button id="close-popup">&times;</button>
                    </div>
                </div>
            `);

    });

    function closePopup() {
        $(".video-container").css("animation", "slideDown 0.4s forwards");
        $(".video-overlay").css("animation", "fadeOut 0.3s forwards");

        setTimeout(() => {
            $("#video-popup").remove();
        }, 400); // Esperamos que termine la animación antes de eliminar el popup
    }

    // Cerrar el popup del video
    $(document).on("click", "#close-popup, .video-overlay", function () {
        closePopup();
    });
    $(document).on("keydown", function (e) {
        if (e.key !== "Escape") return;
        closePopup();

    });

    // Toggle hamburger menu
    $(document).on("click", "nav div.burguer", function (e) {
        $("#hamburger-menu").toggleClass("menu-visible menu-hidden");

    });

});
