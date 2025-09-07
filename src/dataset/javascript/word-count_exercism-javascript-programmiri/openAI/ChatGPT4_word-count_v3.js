export class Words {
  count(string) {
    return string
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
  }
}