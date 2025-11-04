/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_255548775")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  'stats' AS id,\n  COUNT(c.id) AS totalCommandes,\n  (COALESCE(SUM(c.total), 0)) AS prixTotalGagne\nFROM commande AS c\n"
  }, collection)

  // remove field
  collection.fields.removeById("number2299286586")

  // remove field
  collection.fields.removeById("json1559587887")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number656073566",
    "max": null,
    "min": null,
    "name": "totalCommandes",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json3151594331",
    "maxSize": 1,
    "name": "prixTotalGagne",
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
    "viewQuery": "SELECT\n  'stats' AS id,\n  COUNT(*) AS total_commandes,\n  ROUND(SUM(COALESCE(c.total, l.montant, 0)), 2) AS prix_total_gagne\nFROM commande c\nLEFT JOIN (\n  SELECT id_commande, SUM(COALESCE(quantite,0) * COALESCE(prix_unitaire,0)) AS montant\n  FROM ligne_commande\n  GROUP BY id_commande\n) l ON l.id_commande = c.id;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
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
  }))

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

  // remove field
  collection.fields.removeById("number656073566")

  // remove field
  collection.fields.removeById("json3151594331")

  return app.save(collection)
})
