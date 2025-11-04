/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  'global' AS id,\n  COUNT(*) AS total_commandes,\n  ROUND(SUM(COALESCE(c.total, l.montant_commande, 0.0)), 2) AS total_revenu\nFROM commande c\nLEFT JOIN (\n  SELECT id_commande, SUM(COALESCE(quantite,0) * COALESCE(prix_unitaire,0.0)) AS montant_commande\n  FROM ligne_commande\n  GROUP BY id_commande\n) l ON l.id_commande = c.id;\n"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "WITH lignes_par_commande AS (\n  SELECT\n    lc.id_commande,\n    SUM(COALESCE(lc.quantite, 0) * COALESCE(lc.prix_unitaire, 0.0)) AS montant_commande\n  FROM ligne_commande AS lc\n  GROUP BY lc.id_commande\n),\ntotaux_par_commande AS (\n  SELECT\n    c.id AS id_commande,\n    COALESCE(c.total, lpc.montant_commande, 0.0) AS total_commande\n  FROM commande AS c\n  LEFT JOIN lignes_par_commande AS lpc\n    ON lpc.id_commande = c.id\n\n)\nSELECT\n  'global' AS id,               \n  COUNT(*) AS total_commandes,  \n  ROUND(SUM(total_commande), 2) AS total_revenu \nFROM totaux_par_commande\n;\n"
  }, collection)

  return app.save(collection)
})
