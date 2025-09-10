class ETL {
  transform(oldStruct) {
    const newStruct = {};
    for (const [key, values] of Object.entries(oldStruct)) {
      const parsedKey = parseInt(key);
      for (const val of values) {
        newStruct[val.toLowerCase()] = parsedKey;
      }
    }
    return newStruct;
  }
}

export default ETL;