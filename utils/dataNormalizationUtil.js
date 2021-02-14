//Eliminates the duplicate ids from a map and returns it
const removeDuplicatesById = (mapObject) => {
    return Array.from(new Set([...mapObject.keys()]))
        .map(id => {
            return mapObject.get(id)
        });
}

module.exports = {
    removeDuplicatesById
}