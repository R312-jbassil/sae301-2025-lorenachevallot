/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  'stats' AS id,\n  COUNT(*) AS total_commandes,\n  ROUND(SUM(COALESCE(c.total, l.montant, 0)), 2) AS prix_total_gagne\nFROM commande c\nLEFT JOIN (\n  SELECT id_commande, SUM(COALESCE(quantite,0) * COALESCE(prix_unitaire,0)) AS montant\n  FROM ligne_commande\n  GROUP BY id_commande\n) l ON l.id_commande = c.id;\n"
  }, collection)

  // remove field
  collection.fields.removeById("json3048727379")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json1559587887",
    "maxSize": 1,
    "name": "prix_total_gagne",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  'global' AS id,\n  COUNT(*) AS total_commandes,\n  ROUND(SUM(COALESCE(c.total, l.montant_commande, 0.0)), 2) AS total_revenu\nFROM commande c\nLEFT JOIN (\n  SELECT id_commande, SUM(COALESCE(quantite,0) * COALESCE(prix_unitaire,0.0)) AS montant_commande\n  FROM ligne_commande\n  GROUP BY id_commande\n) l ON l.id_commande = c.id;\n"
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json3048727379",
    "maxSize": 1,
    "name": "total_revenu",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("json1559587887")

  return app.save(collection)
})
