// Store for configurator state management
export interface ConfiguratorState {
    modelId?: string; // ID du modèle en cours d'édition
    loadedAt?: number; // Timestamp du chargement du modèle (pour éviter les faux positifs lors du chargement initial)
    materiaux: {
        montureId?: string;
        montureType?: string;
        branchesId?: string;
        branchesType?: string;
    };
    couleurs: {
        monture?: string;
        branches?: string;
        verres?: string;
    };
    tailles: {
        largeurVerres?: number;
        hauteurVerres?: number;
        largeurPont?: number;
    };
    finitions: {
        type?: string;
    };
    options: {
        emboutPersonnalises?: boolean;
        charnieresFlexibles?: boolean;
        gravurePersonnalisee?: boolean;
    };
}

const STORAGE_KEY = 'configurator_state';

export function getConfigurator(): ConfiguratorState {
    if (typeof window === 'undefined') return getDefaultState();

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : getDefaultState();
    } catch {
        return getDefaultState();
    }
}

export function getDefaultState(): ConfiguratorState {
    return {
        modelId: undefined,
        materiaux: {
            montureId: '',
            montureType: 'Acétate de cellulose',
            branchesId: '',
            branchesType: 'Acétate de cellulose',
        },
        couleurs: {
            monture: 'Noir',
            branches: 'Noir',
            verres: 'Transparent',
        },
        tailles: {
            largeurVerres: 48,
            hauteurVerres: 20,
            largeurPont: 42,
        },
        finitions: {
            type: 'Mat',
        },
        options: {
            emboutPersonnalises: false,
            charnieresFlexibles: false,
            gravurePersonnalisee: false,
        },
    };
}

export function saveConfigurator(state: ConfiguratorState): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        // Dispatch custom event for reactive updates
        window.dispatchEvent(new CustomEvent('configurator-changed', { detail: state }));
    } catch (e) {
        console.error('Failed to save configurator state:', e);
    }
}

export function updateMaterialaux(data: Partial<ConfiguratorState['materiaux']>): void {
    const state = getConfigurator();
    state.materiaux = { ...state.materiaux, ...data };
    saveConfigurator(state);
}

export function updateCouleurs(data: Partial<ConfiguratorState['couleurs']>): void {
    const state = getConfigurator();
    state.couleurs = { ...state.couleurs, ...data };
    saveConfigurator(state);
}

export function updateTailles(data: Partial<ConfiguratorState['tailles']>): void {
    const state = getConfigurator();
    state.tailles = { ...state.tailles, ...data };
    saveConfigurator(state);
}

export function updateFinitions(data: Partial<ConfiguratorState['finitions']>): void {
    const state = getConfigurator();
    state.finitions = { ...state.finitions, ...data };
    saveConfigurator(state);
}

export function updateOptions(data: Partial<ConfiguratorState['options']>): void {
    const state = getConfigurator();
    state.options = { ...state.options, ...data };
    saveConfigurator(state);
}

export function resetConfigurator(): void {
    const defaultState = getDefaultState();
    saveConfigurator(defaultState);
}

// Fonction pour calculer le prix basé sur les options
function calculatePrice(state: ConfiguratorState): number {
    let price = 280; // Prix de base

    // Ajouter les prix des options
    if (state.options.emboutPersonnalises) price += 30;
    if (state.options.charnieresFlexibles) price += 40;
    if (state.options.gravurePersonnalisee) price += 25;

    return price;
}

// Map des couleurs nommées aux codes hex
const colorMap: Record<string, string> = {
    Noir: "#000000",
    Or: "#D4AF37",
    Bleu: "#1E3A8A",
    "Bleu foncé": "#1E3A8A",
    "Bleu clair": "#3B82F6",
    Rouge: "#EF4444",
    Vert: "#22C55E",
    Violet: "#6366F1",
    Rose: "#F9A8D4",
    Gris: "#F3F4F6",
    Transparent: "rgba(202, 201, 243, 0.4)",
};

// Fonction pour générer le SVG complet avec les couleurs appliquées
function generateSvgString(state: ConfiguratorState): string {
    const montureFill = colorMap[state.couleurs.monture || 'Noir'] || '#000000';
    const branchesFill = colorMap[state.couleurs.branches || 'Noir'] || '#000000';
    const verresFill = colorMap[state.couleurs.verres || 'Transparent'] || 'rgba(202, 201, 243, 0.4)';

    // Déterminer l'opacité des verres
    let verresOpacity = '0.4';
    if (verresFill.includes('rgba')) {
        verresOpacity = '1';
    } else if (verresFill !== 'transparent') {
        verresOpacity = '0.6';
    }

    return `<svg
    width="564"
    height="217"
    viewBox="0 0 564 217"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id="lunettes-svg"
>
    <g clip-path="url(#clip0_2066_1290)">
        <path
            id="branche-gauche"
            class="svg-branche"
            d="M8.11946 60.0087C8.11946 60.0087 76.8439 52.2607 84.6146 47.8234C92.3852 43.386 100.128 36.7508 111.77 34.5391C123.412 32.3273 201.564 19.043 201.564 19.043C201.564 19.043 211.535 16.2749 225.949 26.791C240.362 37.3072 271.96 71.0813 280.817 69.9824C289.688 68.8696 294.116 56.6981 291.345 51.1618C288.574 45.6255 234.708 5.60573 225.392 2.9906C212.12 -0.737352 194.908 -0.333954 173.838 2.9906C152.782 6.31515 11.9909 35.4571 11.9909 35.4571C11.9909 35.4571 -6.29388 43.9702 8.10553 60.0226L8.11946 60.0087Z"
            fill="${branchesFill}"
            stroke="#1D1D1B"
            stroke-width="0.5"
            stroke-miterlimit="10"></path>
        <g style="mix-blend-mode:multiply">
            <path
                d="M285.816 53.9159C285.816 53.9159 285.384 62.4708 280.274 61.664C273.352 60.579 230.391 14.6056 215.978 16.8173C215.978 16.8173 227.856 20.587 241.685 33.0088C250.751 41.1602 289.618 85.6591 285.816 53.9159Z"
                fill="#706F6F"></path>
        </g>
        <path
            id="branche-droite"
            class="svg-branche"
            d="M378.493 94.1027L504.579 52.678C504.579 52.678 535.397 44.8465 539.881 47.0861C544.365 49.3256 564.544 89.6236 564.544 94.1027C564.544 98.5818 561.174 113.591 556.703 114.815C553.459 115.705 549.281 114.968 547.178 108.959C545.215 103.367 537.653 64.8216 529.812 65.1833C521.972 65.545 459.208 87.3702 459.208 87.3702C459.208 87.3702 440.714 96.3284 432.874 103.047C425.034 109.766 388.047 118.724 388.047 118.724C388.047 118.724 374.594 108.083 378.521 94.0888L378.493 94.1027Z"
            fill="${branchesFill}"
            stroke="#1D1D1B"
            stroke-width="0.5"
            stroke-miterlimit="10"></path>
        <g style="mix-blend-mode:multiply">
            <path
                d="M387.615 94.7287C387.615 94.7287 530.036 45.7785 537.806 50.2298C537.806 50.2298 512.461 53.6934 479.652 66.7552C446.842 79.8169 387.615 97.3995 387.615 97.3995V94.7287Z"
                fill="#706F6F"></path>
        </g>
        <g style="mix-blend-mode:multiply">
            <path
                d="M532.473 64.0705C532.473 64.0705 537.013 64.0705 539.408 68.8696C541.803 73.6686 553.013 103.242 553.013 103.242C553.013 103.242 554.086 110.169 560.213 99.5139C560.213 99.5139 555.938 112.812 552.749 108.959C549.56 105.106 539.143 72.3332 539.143 72.3332C539.143 72.3332 535.146 62.9577 532.473 64.0705Z"
                fill="#706F6F"></path>
        </g>
        <path
            id="verre-droit"
            class="svg-verre"
            d="M270.347 207.905C229.147 206.305 201.847 140.239 193.347 107.405C206.147 89.4054 228.013 83.2387 237.347 82.4054C277.013 79.9054 357.247 84.9054 360.847 124.905C364.447 164.905 346.347 194.905 336.847 204.905C331.847 206.572 311.547 209.505 270.347 207.905Z"
            fill="${verresFill}"
            fill-opacity="${verresOpacity}"
            stroke="black"></path>
        <path
            id="verre-gauche"
            class="svg-verre"
            d="M58.8465 166.405C19.2465 149.605 18.3465 84.0716 22.8465 53.405C26.5133 48.5716 43.6467 41.805 82.8467 53.405C131.847 67.905 145.347 85.405 149.347 107.405C152.547 125.005 134.347 154.072 124.847 166.405C119.347 173.405 98.4465 183.205 58.8465 166.405Z"
            fill="${verresFill}"
            fill-opacity="${verresOpacity}"
            stroke="black"></path>
        <path
            id="monture"
            class="svg-monture"
            d="M393.143 95.7163C392.809 90.9729 379.816 88.4551 375.443 86.8137C371.07 85.1723 353.579 89.5401 353.579 89.5401C336.632 85.1723 277.614 76.9791 243.732 76.9791C209.85 76.9791 198.375 92.809 194.545 92.2665C190.716 91.724 170.495 91.1815 161.75 89.5401C153.004 87.8987 154.648 69.8849 107.091 52.7057C59.5475 35.5266 11.9904 35.4292 11.9904 35.4292C-6.60067 41.9114 2.57651 61.1493 2.57651 61.1493L5.43133 69.9823C11.4473 72.8061 9.80407 84.6159 11.9904 102.087C14.1768 119.558 22.3792 141.94 31.6678 155.586C40.9564 169.232 75.9383 184.519 93.4292 185.062C110.92 185.604 126.225 182.335 137.7 163.765C149.175 145.209 161.207 112.45 161.207 112.45L175.411 114.634C175.411 114.634 179.464 115.065 182.862 118.932C186.259 122.8 189.031 130.102 193.445 143.011C203.973 173.753 228.427 197.609 228.427 197.609C228.427 197.609 236.226 207.944 274.995 215.219C307.137 221.256 334.459 211.797 334.459 211.797C359.136 201.824 364.581 149.257 364.581 149.257C364.581 149.257 367.129 130.756 375.457 126.096C385.72 120.337 386.974 119.92 393.157 118.696C398.184 117.708 393.491 100.432 393.157 95.6884L393.143 95.7163ZM121.852 165.977C108.734 173.071 77.0384 175.798 57.3611 160.524C37.6838 145.237 28.3952 118.487 25.6657 86.8276C22.9362 55.1679 35.5531 51.732 35.5531 51.732C35.5531 51.732 56.2749 50.8 83.0544 57.3379C109.834 63.8896 139.343 82.4459 139.9 94.4643C140.443 106.469 134.984 158.883 121.866 165.977H121.852ZM336.632 199.821C324.057 205.83 306.733 206.372 292.166 205.273C277.6 204.188 239.888 203.09 226.227 161.595C226.227 161.595 222.397 141.94 219.125 137.572C215.852 133.204 206.006 117.43 206.006 111.936C206.006 100.487 215.963 93.894 215.963 93.894C215.963 93.894 227.327 86.7998 242.075 86.7998C256.836 86.7998 332.245 90.6251 342.634 104.814C353.022 119.002 352.465 135.388 354.109 148.492C355.752 161.595 349.193 193.797 336.618 199.807L336.632 199.821Z"
            fill="${montureFill}"
            stroke="#1D1D1B"
            stroke-width="0.5"
            stroke-miterlimit="10"></path>
    </g>
    <defs>
        <clipPath id="clip0_2066_1290">
            <rect width="564" height="217" fill="white"></rect>
        </clipPath>
    </defs>
</svg>`;
}

export async function saveToPocketBase(name: string): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
        const state = getConfigurator();

        // Vérifier si l'utilisateur possède déjà une paire identique (mêmes paramètres)
        // Si oui, proposer de modifier cette paire ou d'en créer une nouvelle.
        // Nous ferons la recherche après l'authentification PocketBase.

        // Import PocketBase (si pas déjà importé)
        const { default: PocketBase } = await import('pocketbase');
        const pb = new PocketBase('http://127.0.0.1:8090');

        // Récupérer l'ID utilisateur depuis les cookies
        function getCookie(name: string): string | null {
            const nameEQ = name + "=";
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(cookie.substring(nameEQ.length));
                }
            }
            return null;
        }

        const userId = getCookie('pb_user_id');
        console.log('User ID from cookie:', userId);

        // Essayer d'authentifier l'utilisateur actuel
        // Si aucun utilisateur n'est connecté, utiliser l'authentification en tant qu'admin
        if (!pb.authStore.isValid) {
            try {
                // Essayer de se connecter en tant qu'admin (vous devez avoir les identifiants)
                await pb.admins.authWithPassword('admin@admin.com', 'MdpAdminSae301');
                console.log('Authentifié en tant qu\'admin');
            } catch (authError) {
                console.warn('Impossible de se connecter en tant qu\'admin:', authError);
            }
        }

        // Vérifier que nous avons un utilisateur valide
        if (!userId) {
            throw new Error('Utilisateur non connecté. Veuillez vous connecter avant de sauvegarder.');
        }

        // Calculer la valeur hex de la teinte des verres depuis l'état courant
        const verresFillCheck = colorMap[state.couleurs.verres || 'Transparent'] || 'rgba(202, 201, 243, 0.4)';
        let teintHexValueCheck = verresFillCheck;
        if (verresFillCheck.includes('rgba')) {
            teintHexValueCheck = '#CAC9F3';
        }

        // Vérifier si l'utilisateur possède déjà des modèles sauvegardés
        let userModels: any[] = [];
        try {
            const listResp = await pb.collection('modele').getList(1, 200, {
                filter: `id_utilisateur="${userId}"`,
            });
            userModels = listResp.items || [];
            console.log('Modèles trouvés pour cet utilisateur:', userModels.length);
        } catch (err) {
            console.warn('Erreur lors de la recherche des modèles:', err);
        }

        // Vérifier si on vient de charger un modèle (moins d'1 seconde)
        const now = Date.now();
        const loadedAt = (state.loadedAt || 0);
        const isRecentlyLoaded = (now - loadedAt) < 1000;
        console.log('Modèle récemment chargé ?', isRecentlyLoaded, 'Temps écoulé:', now - loadedAt, 'ms');

        // Si l'utilisateur possède déjà des modèles ET ce n'est PAS une modification en cours (modèle récemment chargé)
        if (userModels.length > 0 && !isRecentlyLoaded) {
            console.log('L\'utilisateur possède des paires existantes et n\'est pas en modification');

            // Afficher le modal avec la liste des modèles et le choix modifier/créer
            const choice = await (window as any).showSaveChoiceModal?.(userModels);
            console.log('Choix utilisateur:', choice);

            if (choice && choice.action === 'update') {
                // L'utilisateur veut modifier une paire existante
                console.log('Modification du modèle:', choice.modelId);
                state.modelId = choice.modelId;
                state.loadedAt = now; // Mettre à jour le timestamp pour marquer le chargement
                saveConfigurator(state);
                const selectedModel = userModels.find((m: any) => m.id === choice.modelId);
                name = selectedModel?.titre || 'Sans nom';
            } else if (choice && choice.action === 'create') {
                // L'utilisateur veut créer une nouvelle paire
                state.modelId = undefined; // Nettoyer le modelId
                state.loadedAt = undefined;
                saveConfigurator(state);
                const newName = await (window as any).showSaveNameModal?.('');
                if (!newName) {
                    return;
                }
                name = newName;
            } else {
                return;
            }
        } else if (state.modelId && isRecentlyLoaded) {
            // L'utilisateur modifie un modèle qu'il vient de charger
            console.log('Modèle en cours de modification:', state.modelId);
            try {
                const existingModel = await pb.collection('modele').getOne(state.modelId);
                name = existingModel.titre;
                console.log('Titre du modèle existant retrouvé:', name);
            } catch (err) {
                console.warn('Impossible de récupérer le modèle existant:', err);
                state.modelId = undefined;
                state.loadedAt = undefined;
                saveConfigurator(state);
                // Demander un nouveau nom
                const newName = await (window as any).showSaveNameModal?.('');
                if (!newName) return;
                name = newName;
            }
        } else {
            // Pas de modèle existant, juste demander le nom de la nouvelle paire
            console.log('Aucune paire existante, demander le nom');
            state.modelId = undefined;
            state.loadedAt = undefined;
            saveConfigurator(state);
            if (!name) {
                const newName = await (window as any).showSaveNameModal?.('');
                if (!newName) {
                    return;
                }
                name = newName;
            }
        }

        // Récupérer les IDs des matériaux en fonction de leurs noms (libellés)
        console.log('Récupération des IDs des matériaux...');
        let montureMateriauId = state.materiaux.montureId || '';
        let branchesMateriauId = state.materiaux.branchesId || '';

        try {
            // Si les IDs ne sont pas stockés, chercher par libellé
            if (!montureMateriauId && state.materiaux.montureType) {
                const montureResponse = await pb.collection('materiau').getFirstListItem(`libelle="${state.materiaux.montureType}"`);
                montureMateriauId = montureResponse.id;
                console.log('Matériau monture trouvé:', montureMateriauId);
            }

            if (!branchesMateriauId && state.materiaux.branchesType) {
                const branchesResponse = await pb.collection('materiau').getFirstListItem(`libelle="${state.materiaux.branchesType}"`);
                branchesMateriauId = branchesResponse.id;
                console.log('Matériau branches trouvé:', branchesMateriauId);
            }
        } catch (error) {
            console.warn('Erreur lors de la recherche des matériaux par libellé:', error);
            // Continuer même si on ne trouve pas les matériaux
        }

        // Créer l'enregistrement dans la collection sauvegarde
        console.log('Tentative de création de sauvegarde avec userId:', userId);
        const svgCode = generateSvgString(state);
        console.log('SVG Code length:', svgCode.length);
        console.log('SVG Code preview:', svgCode.substring(0, 200));
        const saveRecord = await pb.collection('sauvegarde').create({
            nom: name,
            code_svg: svgCode,
            historique_chat: '',
            id_utilisateur: userId,
        });

        console.log('Sauvegarde créée avec succès:', saveRecord);

        // Créer le modèle avec les données du configurateur
        console.log('Tentative de création du modèle avec userId:', userId);
        const verresFill = colorMap[state.couleurs.verres || 'Transparent'] || 'rgba(202, 201, 243, 0.4)';
        // Extraire le code hex des verres (sans rgba)
        let teintHexValue = verresFill;
        if (verresFill.includes('rgba')) {
            teintHexValue = '#CAC9F3'; // Couleur par défaut pour transparent
        }
        console.log('Couleur verres sélectionnée:', state.couleurs.verres, '-> hex:', teintHexValue);
        const modelData: any = {
            titre: name,
            code_svg: generateSvgString(state),
            couleur_monture: state.couleurs.monture || '',
            couleur_branches: state.couleurs.branches || '',
            couleur_verres: state.couleurs.verres || '',
            finition: state.finitions.type || '',
            largeur_verres: state.tailles.largeurVerres || 0,
            hauteur_verres: state.tailles.hauteurVerres || 0,
            largeur_pont: state.tailles.largeurPont || 0,
            teinte_hex: teintHexValue,
            estimation_prix: calculatePrice(state).toString(),
            id_utilisateur: userId,
        };

        // Ajouter les IDs des matériaux s'ils sont disponibles
        if (montureMateriauId) {
            modelData.id_materiau_monture = montureMateriauId;
            console.log('Matériau monture ajouté au modèle:', montureMateriauId);
        }
        if (branchesMateriauId) {
            modelData.id_materiau_branche = branchesMateriauId;
            console.log('Matériau branches ajouté au modèle:', branchesMateriauId);
        }

        console.log('Données du modèle:', modelData);

        let modelRecord;
        if (state.modelId) {
            // Essayer de mettre à jour le modèle existant
            console.log('Mise à jour du modèle existant:', state.modelId);
            try {
                modelRecord = await pb.collection('modele').update(state.modelId, modelData);
                console.log('Modèle mis à jour avec succès:', modelRecord);
            } catch (updateError: any) {
                // Si le modèle n'existe pas (404), créer un nouveau
                if (updateError?.status === 404) {
                    console.warn('Le modèle n\'existe plus, création d\'un nouveau modèle');
                    state.modelId = undefined;
                    saveConfigurator(state);
                    modelRecord = await pb.collection('modele').create(modelData);
                    console.log('Nouveau modèle créé avec succès:', modelRecord);
                    // Ajouter le modelId à l'état
                    state.modelId = modelRecord.id;
                    saveConfigurator(state);
                } else {
                    throw updateError;
                }
            }
        } else {
            // Créer un nouveau modèle
            console.log('Création d\'un nouveau modèle');
            modelRecord = await pb.collection('modele').create(modelData);
            console.log('Modèle créé avec succès:', modelRecord);
            // Ajouter le modelId à l'état
            state.modelId = modelRecord.id;
            saveConfigurator(state);
        }

        // Dispatch event pour informer l'UI
        window.dispatchEvent(new CustomEvent('configurator-saved', {
            detail: {
                id: saveRecord.id,
                name: name,
                modelId: modelRecord.id
            }
        }));
    } catch (e) {
        console.error('Erreur lors de la sauvegarde dans PocketBase:', e);
        if (e instanceof Error) {
            console.error('Message d\'erreur:', e.message);
            console.error('Stack:', e.stack);
            // Afficher les détails de l'erreur PocketBase
            if ('response' in e) {
                const response = (e as any).response;
                console.error('Response:', response);
                if (response && response.data) {
                    console.error('Validation errors:', response.data);
                    if (response.data.code_svg) {
                        console.error('Erreur code_svg:', response.data.code_svg);
                    }
                }
            }
            if ('data' in e) {
                console.error('Data:', (e as any).data);
            }
        }
        throw e;
    }
}
