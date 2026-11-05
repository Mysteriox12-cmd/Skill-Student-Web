const boutonTheme = document.getElementById("bouton-theme");
const optionsTheme = document.getElementById("options-theme");

function appliquerTheme(theme) {
    document.documentElement.classList.toggle(
        "sombre",
        theme === "sombre"
    );
}

function fermerOptions() {
    optionsTheme.hidden = true;
    boutonTheme.setAttribute("aria-expanded", "false");
}

// Restaure le thème enregistré.
appliquerTheme(localStorage.getItem("theme") || "clair");

// Affiche ou masque les choix.
boutonTheme.addEventListener("click", () => {
    optionsTheme.hidden = !optionsTheme.hidden;
    boutonTheme.setAttribute(
        "aria-expanded",
        String(!optionsTheme.hidden)
    );
});

// Applique le choix de l’utilisateur.
optionsTheme.querySelectorAll("[data-theme]").forEach(bouton => {
    bouton.addEventListener("click", () => {
        const theme = bouton.dataset.theme;

        appliquerTheme(theme);
        localStorage.setItem("theme", theme);
        fermerOptions();
        boutonTheme.focus();
    });
});

// Ferme les options si on clique ailleurs.
document.addEventListener("click", event => {
    if (
        !boutonTheme.contains(event.target) &&
        !optionsTheme.contains(event.target)
    ) {
        fermerOptions();
    }
});

// Ferme les options avec la touche Échap.
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !optionsTheme.hidden) {
        fermerOptions();
        boutonTheme.focus();
    }
});
