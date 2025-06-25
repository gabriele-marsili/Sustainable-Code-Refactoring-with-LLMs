type RosterType = { [grade: number]: string[] }
type ReturnRosterType = { [grade: number]: ReadonlyArray<string> }

export class GradeSchool {

  private _roster: RosterType;

  constructor() {
    this._roster = {};
  }
  
  roster(): ReturnRosterType {
    let newO: ReturnRosterType = {};
    Object.keys(this._roster).forEach((grade: string) => {
      newO[Number(grade)] = [...this._roster[Number(grade)]];
    });
    return newO;
  }

  add(name: string, grade: number): void {
    this.removeIfNecessary(name);
    
    if(this._roster[grade]) {
      this._roster[grade].push(name);
      this._roster[grade].sort();
    } else {
      this._roster[grade] = [name];
    }
  }

  private removeIfNecessary(newName: string): void {
    Object.keys(this._roster).forEach((grade: string) => {
      this._roster[Number(grade)] = this._roster[Number(grade)].filter(name => name !== newName);
    });
  }
  
  grade(g: number): ReadonlyArray<string> {
    let ro: ReadonlyArray<string> = this._roster[g] ? this._roster[g].slice() : []; 
    return ro;
  }
}
