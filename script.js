$(document).ready(function () {
    let filterActive = false;

    $.getJSON("wallpapers.json", function (data) {
        $.each(data, function (index, img) {
            $("#galeria").append(`<div class="img-container video-link ${img.style}" video-data="${img.video}">
                <img src="${img.path}" alt="${img.name}" title="${img.name}" loading="lazy">
            </div>`);
        });
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
        $("#galeria div.img-container").each(function () {
            if ($(this).hasClass(filterClass)) {
                $(this).show();
                filterActive = true;
            } else {
                $(this).hide();
            }
        });
    }

    $("#light-images").on("click", function () { applyFilter("light"); });
    $("#dark-images").on("click", function () { applyFilter("dark"); });
    $("#midnight-images").on("click", function () { applyFilter("midnight"); });

    $("#reset").on("click", function () {
        $("#galeria div.img-container").each(function () {
            $(this).show();
        });
        $(".nav-elem").removeClass("active");
        filterActive = false;
    });

    // Evitar el evento por defecto de la etiqueta "a" y mostrar el video en un popup
    $(document).on("click", ".video-link", function (e) {
        if (!filterActive) {
            e.preventDefault();
        } else {
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
                        <button id="close-popup">X</button>
                    </div>
                </div>
            `);
        }
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

});