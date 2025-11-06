/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("pbc_655489046")

    // add field
    collection.fields.addAt(4, new Field({
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text543225895",
        "max": 0,
        "min": 0,
        "name": "couleur_verres",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
    }))

    return app.save(collection)
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_655489046")

    // remove field
    collection.fields.removeById("text543225895")

    return app.save(collection)
})
