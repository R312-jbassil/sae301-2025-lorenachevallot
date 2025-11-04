/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_782564964")

  // remove field
  collection.fields.removeById("text3257917790")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3257917790",
    "max": null,
    "min": null,
    "name": "total",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_782564964")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3257917790",
    "max": 0,
    "min": 0,
    "name": "total",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number3257917790")

  return app.save(collection)
})
