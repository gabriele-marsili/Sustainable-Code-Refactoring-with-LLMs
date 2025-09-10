class ETL {
  transform(oldStruct) {
    const newStruct = {};
    for (const [key, values] of Object.entries(oldStruct)) {
      const keyInt = parseInt(key);
      for (const val of values) {
        newStruct[val.toLowerCase()] = keyInt;
      }
    }
    return newStruct;
  }
}

export default ETL;