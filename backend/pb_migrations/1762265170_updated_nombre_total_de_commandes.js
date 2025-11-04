/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  'stats' AS id,\n  COUNT(*) AS total_commandes,\n  ROUND(SUM(COALESCE(c.total, l.montant, 0)), 2) AS prix_total_gagne\nFROM commande c\nLEFT JOIN (\n  SELECT id_commande, SUM(COALESCE(quantite,0) * COALESCE(prix_unitaire,0)) AS montant\n  FROM ligne_commande\n  GROUP BY id_commande\n) l ON l.id_commande = c.id;"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  'stats' AS id,\n  COUNT(*) AS total_commandes,\n  ROUND(SUM(COALESCE(c.total, l.montant, 0)), 2) AS prix_total_gagne\nFROM commande c\nLEFT JOIN (\n  SELECT id_commande, SUM(COALESCE(quantite,0) * COALESCE(prix_unitaire,0)) AS montant\n  FROM ligne_commande\n  GROUP BY id_commande\n) l ON l.id_commande = c.id;\n"
  }, collection)

  return app.save(collection)
})
