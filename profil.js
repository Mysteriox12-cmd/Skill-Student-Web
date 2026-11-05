const nomUtilisateur = document.getElementById("nom-utilisateur");
const ecoleUtilisateur = document.getElementById("ecole-utilisateur");

try {
    const profil = JSON.parse(sessionStorage.getItem("profil"));

    nomUtilisateur.textContent = profil?.nom || "utilisateur";
    ecoleUtilisateur.textContent = profil?.ecole || "Non renseigné";
} catch (erreur) {
    console.error("Impossible de lire le profil :", erreur);
}