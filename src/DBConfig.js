export const DBConfig = {

    name: 'mydb',
    version: 1,
    objectStoresMeta: [
        {
          store: 'tasks',
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'title', keypath: 'title', options: { unique: false } },
            { name: 'time', keypath: 'time', options: { unique: false } },
            { name: 'done', keypath: 'done', options: { unique: false } }

          ]
        }
    ]
};