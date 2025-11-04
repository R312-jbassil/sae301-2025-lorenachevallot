/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_379306716")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_655489046",
    "hidden": false,
    "id": "relation909455541",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_modele",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_782564964",
    "hidden": false,
    "id": "relation1043417832",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_commande",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_379306716")

  // remove field
  collection.fields.removeById("relation909455541")

  // remove field
  collection.fields.removeById("relation1043417832")

  return app.save(collection)
})
