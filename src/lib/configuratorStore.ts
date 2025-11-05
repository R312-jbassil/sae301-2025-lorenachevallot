// Store for configurator state management
export interface ConfiguratorState {
    materiaux: {
        montureType?: string;
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
        materiaux: {
            montureType: 'Acétate de cellulose',
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

export async function saveToPocketBase(name: string): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
        const state = getConfigurator();

        // Import PocketBase dynamiquement
        const { default: PocketBase } = await import('pocketbase');
        const pb = new PocketBase('http://127.0.0.1:8090');

        // Essayer d'authentifier l'utilisateur actuel
        // Si aucun utilisateur n'est connecté, utiliser l'authentification en tant qu'admin
        if (!pb.authStore.isValid) {
            try {
                // Essayer de se connecter en tant qu'admin (vous devez avoir les identifiants)
                await pb.admins.authWithPassword('admin@admin.com', 'MdpAdminSae301');
            } catch (authError) {
                console.warn('Impossible de se connecter en tant qu\'admin:', authError);
            }
        }

        // Créer l'enregistrement dans la collection sauvegarde
        const record = await pb.collection('sauvegarde').create({
            nom: name,
            code_svg: JSON.stringify(state),
            historique_chat: '',
        });

        console.log('Configuration sauvegardée avec succès:', record);

        // Dispatch event pour informer l'UI
        window.dispatchEvent(new CustomEvent('configurator-saved', {
            detail: { id: record.id, name: name }
        }));
    } catch (e) {
        console.error('Erreur lors de la sauvegarde dans PocketBase:', e);
        throw e;
    }
}
