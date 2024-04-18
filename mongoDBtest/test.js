const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://cheetah5i89:OwnLj9rEoEO0V0qo@testdatabase.486pb2d.mongodb.net/?retryWrites=true&w=majority&appName=TestDatabase";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function listDatabases(client) {
    const databsesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databsesList.databases.forEach(db => console.log(`- ${db.name}`));
}
