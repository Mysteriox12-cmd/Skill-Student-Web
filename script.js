const DOMAINES_PAR_CONSEIL = {
    "Centre-Est": ["ecolecatholique.ca"],
    "CEPEO": ["cepeo.on.ca"],
    "Grandes Rivieres": ["cscdgr.education"],
    "Nouvelon": ["nouvelon.ca"],
    "Franco-Nord": ["franco-nord.ca"],
    "MonAvenir": ["cscmonavenir.ca"],
    "CSDCEO": ["csdceo.org"],
    "Aurores boreales": ["csdcab.on.ca"],
    "Providence": ["cscprovidence.ca"],
    "Grand Nord": ["grandnord.ca"],
    "CSPNE": ["cspne.ca"],
    "Viamonde": ["csviamonde.ca", "viamonde.ca"],
    "Centre Jules-Leger": ["ccjl.ca"],
    "CAVLFO": ["cavlfo.org"],
    "Centre franco": ["lecentrefranco.ca"]
};

const formulaire = document.getElementById("form-inscription");
const email = document.getElementById("email");
const ecole = document.getElementById("ecole");
const username = document.getElementById("username");
const regles = document.getElementById("acceptation-regles");

const message = document.getElementById("resultat-verification")
    || document.getElementById("message-verification")
    || document.createElement("span");

message.id = "resultat-verification";
message.style.display = "block";
message.setAttribute("role", "status");
email.insertAdjacentElement("afterend", message);

email.type = "email";
email.required = ecole.required = regles.required = true;

formulaire.addEventListener("submit", event => {
    event.preventDefault();

    if (!formulaire.reportValidity() || !regles.reportValidity()) return;

    const adresse = email.value.trim();
    const parties = adresse.split("@");
    const domaines = DOMAINES_PAR_CONSEIL[ecole.value] || [];

    const accepte =
        parties.length === 2 &&
        parties[0].length > 0 &&
        !/\s/.test(adresse) &&
        domaines.includes(parties[1].toLowerCase());

    if (accepte) {
        const profil = {
            nom: username.value.trim() || "utilisateur",
            ecole: ecole.selectedOptions[0]?.textContent.trim() || ecole.value
        };

        try {
            sessionStorage.setItem("profil", JSON.stringify(profil));
        } catch (erreur) {
            console.error("Impossible d’enregistrer le profil :", erreur);
            message.style.color = "red";
            message.textContent =
                "Impossible de mémoriser ton nom. Autorise le stockage du site dans ton navigateur, puis réessaie.";
            return;
        }

        window.location.href = "./dashboard.html";
        return;
    }

    message.style.color = "red";
    message.textContent =
        "Utilise une adresse scolaire du conseil sélectionné.";
});

// Efface le résultat lorsque les informations changent.
[email, ecole, regles].forEach(champ => {
    champ.addEventListener("input", () => {
        message.textContent = "";
    });
});
