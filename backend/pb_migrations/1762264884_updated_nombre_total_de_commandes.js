/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "WITH lignes_par_commande AS (\n  SELECT\n    lc.id_commande,\n    SUM(COALESCE(lc.quantite, 0) * COALESCE(lc.prix_unitaire, 0.0)) AS montant_commande\n  FROM ligne_commande AS lc\n  GROUP BY lc.id_commande\n),\ntotaux_par_commande AS (\n  SELECT\n    c.id AS id_commande,\n    COALESCE(c.total, lpc.montant_commande, 0.0) AS total_commande\n  FROM commande AS c\n  LEFT JOIN lignes_par_commande AS lpc\n    ON lpc.id_commande = c.id\n\n)\nSELECT\n  'global' AS id,               \n  COUNT(*) AS total_commandes,  \n  ROUND(SUM(total_commande), 2) AS total_revenu \nFROM totaux_par_commande\n;\n"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "WITH lignes_par_commande AS (\n  SELECT\n    lc.id_commande,\n    SUM(COALESCE(lc.quantite, 0) * COALESCE(lc.prix_unitaire, 0.0)) AS montant_commande\n  FROM ligne_commande AS lc\n  GROUP BY lc.id_commande\n),\ntotaux_par_commande AS (\n  SELECT\n    c.id AS id_commande,\n    COALESCE(c.total, lpc.montant_commande, 0.0) AS total_commande\n  FROM commande AS c\n  LEFT JOIN lignes_par_commande AS lpc\n    ON lpc.id_commande = c.id\n  -- Optionnel : filtrer les commandes comptées\n  -- WHERE c.statut IN ('paye','payée','paid','validee','validée')\n)\nSELECT\n  'global' AS id,                -- id constant pour la ligne de stats\n  COUNT(*) AS total_commandes,   -- nombre de commandes\n  ROUND(SUM(total_commande), 2) AS total_revenu  -- revenu total\nFROM totaux_par_commande\n;\n"
  }, collection)

  return app.save(collection)
})
