/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("pbc_3151604711")

    // update field
    collection.fields.addAt(2, new Field({
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3949269562",
        "max": 99999,
        "min": 0,
        "name": "code_svg",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
    }))

    return app.save(collection)
}, (app) => {
    const collection = app.findCollectionByNameOrId("pbc_3151604711")

    // update field
    collection.fields.addAt(2, new Field({
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3949269562",
        "max": 5000,
        "min": 0,
        "name": "code_svg",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
    }))

    return app.save(collection)
})
