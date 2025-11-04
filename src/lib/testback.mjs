// testback.js
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

async function main() {
    try {
        // auth
        await pb.admins.authWithPassword("admin@admin.com", "MdpAdminSae301");

        // users
        const usersData = [
            { email: "claire.roche@example.com", password: "azerty123", passwordConfirm: "azerty123", prenom: "Claire", nom: "Roche", verified: true },
            { email: "denis.lemaire@example.com", password: "azerty123", passwordConfirm: "azerty123", prenom: "Denis", nom: "Lemaire", verified: true },
            { email: "ines.moreau@example.com", password: "azerty123", passwordConfirm: "azerty123", prenom: "Inès", nom: "Moreau", verified: true },
        ];
        const utilisateurs = [];
        for (const u of usersData) utilisateurs.push(await pb.collection("utilisateur").create(u));

        // materiaux
        const materiauxData = [{ libelle: "Aluminium" }, { libelle: "Acétate" }, { libelle: "Bambou" }];
        const materiaux = [];
        for (const m of materiauxData) materiaux.push(await pb.collection("materiau").create(m));

        // modeles
        const modelesData = [
            {
                titre: "Épure Métal",
                code_svg: "<svg>...</svg>",
                couleur_monture: "noir",
                couleur_branches: "noir",
                finition: "satinée",
                largeur_verres: 49,
                hauteur_verres: 41,
                largeur_pont: 19,
                teinte_hex: "#1A1A1A",
                estimation_prix: 139.9,
                id_materiau_branche: materiaux[0].id,
                id_materiau_monture: materiaux[0].id,
                id_utilisateur: utilisateurs[0].id,
            },
            {
                titre: "Natura Acétate",
                code_svg: "<svg>...</svg>",
                couleur_monture: "écaille",
                couleur_branches: "marron",
                finition: "brillante",
                largeur_verres: 51,
                hauteur_verres: 40,
                largeur_pont: 17,
                teinte_hex: "#6B4A2D",
                estimation_prix: 189.0,
                id_materiau_branche: materiaux[1].id,
                id_materiau_monture: materiaux[1].id,
                id_utilisateur: utilisateurs[1].id,
            },
            {
                titre: "Eco Bamboo",
                code_svg: "<svg>...</svg>",
                couleur_monture: "beige",
                couleur_branches: "bois clair",
                finition: "naturelle",
                largeur_verres: 47,
                hauteur_verres: 39,
                largeur_pont: 18,
                teinte_hex: "#C9A86A",
                estimation_prix: 159.0,
                id_materiau_branche: materiaux[2].id,
                id_materiau_monture: materiaux[2].id,
                id_utilisateur: utilisateurs[2].id,
            },
        ];
        const modeles = [];
        for (const m of modelesData) modeles.push(await pb.collection("modele").create(m));

        // commandes
        const commandesData = [
            { statut: "payee", total: 139.9, id_utilisateur: utilisateurs[0].id },
            { statut: "en_attente", total: 189.0, id_utilisateur: utilisateurs[1].id },
            { statut: "payee", total: 318.9, id_utilisateur: utilisateurs[2].id },
            { statut: "annulee", total: 0, id_utilisateur: utilisateurs[0].id },
        ];
        const commandes = [];
        for (const c of commandesData) commandes.push(await pb.collection("commande").create(c));

        // lignes
        const lignesData = [
            { quantite: 1, prix_unitaire: 139.9, code_svg: "<svg>...</svg>", id_modele: modeles[0].id, id_commande: commandes[0].id },
            { quantite: 1, prix_unitaire: 189.0, code_svg: "<svg>...</svg>", id_modele: modeles[1].id, id_commande: commandes[1].id },
            { quantite: 2, prix_unitaire: 159.45, code_svg: "<svg>...</svg>", id_modele: modeles[2].id, id_commande: commandes[2].id },
            { quantite: 1, prix_unitaire: 139.9, code_svg: "<svg>...</svg>", id_modele: modeles[0].id, id_commande: commandes[3].id },
        ];
        for (const l of lignesData) await pb.collection("ligne_commande").create(l);

        // sauvegardes
        const sauvegardesData = [
            { nom: "Preset Claire A", code_svg: "<svg>...</svg>", historique_chat: "Test Claire.", id_utilisateur: utilisateurs[0].id },
            { nom: "Preset Denis 01", code_svg: "<svg>...</svg>", historique_chat: "Alternative Denis.", id_utilisateur: utilisateurs[1].id },
            { nom: "Preset Inès Wood", code_svg: "<svg>...</svg>", historique_chat: "Essai bambou.", id_utilisateur: utilisateurs[2].id },
        ];
        for (const s of sauvegardesData) await pb.collection("sauvegarde").create(s);

        // vue
        const stats = await pb.collection("nombre_total_de_commandes").getFullList();
        console.log(stats[0]);
        console.log("OK");
    } catch (err) {
        console.error(err);
    }
}

main();
