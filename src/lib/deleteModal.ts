// Fonction pour afficher le modal de confirmation de suppression
export function showDeleteConfirmModal(): Promise<boolean> {
    return new Promise((resolve) => {
        const modal = document.getElementById(
            "delete-confirm-modal",
        ) as HTMLDialogElement;
        const cancelBtn = document.getElementById(
            "delete-cancel",
        ) as HTMLButtonElement;
        const confirmBtn = document.getElementById(
            "delete-confirm",
        ) as HTMLButtonElement;

        if (!modal) {
            console.error("[DeleteModal] Modal not found");
            resolve(false);
            return;
        }

        console.log("[DeleteModal] Modal found, setting up listeners");

        // Nettoyer les anciens event listeners en clonanod les boutons
        const newCancelBtn = cancelBtn?.cloneNode(true) as HTMLButtonElement;
        const newConfirmBtn = confirmBtn?.cloneNode(
            true,
        ) as HTMLButtonElement;

        if (cancelBtn?.parentNode) {
            cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
        }
        if (confirmBtn?.parentNode) {
            confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        }

        // Ajouter les nouveaux event listeners
        newCancelBtn?.addEventListener("click", () => {
            console.log("[DeleteModal] Cancel clicked");
            modal.close();
            resolve(false);
        });

        newConfirmBtn?.addEventListener("click", () => {
            console.log("[DeleteModal] Confirm clicked");
            modal.close();
            resolve(true);
        });

        console.log("[DeleteModal] Showing modal");
        modal.showModal();
    });
}

// Initialiser au chargement de la page
if (typeof window !== "undefined") {
    (window as any).showDeleteConfirmModal = showDeleteConfirmModal;
    console.log("[DeleteModal] Function exposed to window");
}
