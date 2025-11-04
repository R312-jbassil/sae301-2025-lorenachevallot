/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number2299286586",
        "max": null,
        "min": null,
        "name": "total_commandes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "json3048727379",
        "maxSize": 1,
        "name": "total_revenu",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_255548775",
    "indexes": [],
    "listRule": null,
    "name": "nombre_total_de_commandes",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "WITH lignes_par_commande AS (\n  SELECT\n    lc.id_commande,\n    SUM(COALESCE(lc.quantite, 0) * COALESCE(lc.prix_unitaire, 0.0)) AS montant_commande\n  FROM ligne_commande AS lc\n  GROUP BY lc.id_commande\n),\ntotaux_par_commande AS (\n  SELECT\n    c.id AS id_commande,\n    COALESCE(c.total, lpc.montant_commande, 0.0) AS total_commande\n  FROM commande AS c\n  LEFT JOIN lignes_par_commande AS lpc\n    ON lpc.id_commande = c.id\n  -- Optionnel : filtrer les commandes comptées\n  -- WHERE c.statut IN ('paye','payée','paid','validee','validée')\n)\nSELECT\n  'global' AS id,                -- id constant pour la ligne de stats\n  COUNT(*) AS total_commandes,   -- nombre de commandes\n  ROUND(SUM(total_commande), 2) AS total_revenu  -- revenu total\nFROM totaux_par_commande\n;\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775");

  return app.delete(collection);
})
