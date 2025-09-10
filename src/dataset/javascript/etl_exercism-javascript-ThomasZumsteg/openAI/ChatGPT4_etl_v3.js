class ETL {
  transform(oldStruct) {
    const newStruct = {};
    for (const [key, values] of Object.entries(oldStruct)) {
      for (const val of values) {
        newStruct[val.toLowerCase()] = Number(key);
      }
    }
    return newStruct;
  }
}

export default ETL;