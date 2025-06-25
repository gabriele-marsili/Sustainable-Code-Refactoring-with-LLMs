type TeamType = {
    name: string;
    mp: number;
    w: number;
    d: number;
    l: number;
    p: number;
};
type TournamentType = { [n: TeamType['name']]: TeamType };

export class Tournament {
    private _table: string[] = ['Team                           | MP |  W |  D |  L |  P'];
    private _result: TeamType[] = [];

    public tally(input: string): string {
        let t: TournamentType = {};

  if(!input) return this._table.join('\n')
      
        input.split('\n').forEach((game) => {
            let data = game.split(';');
            let homeTeam = data[0];
            let awayTeam = data[1];
            let result = data[2];

            if (!t[homeTeam]) t[homeTeam] = { name: homeTeam, mp: 0, w: 0, d: 0, l: 0, p: 0 };
            if (!t[awayTeam]) t[awayTeam] = { name: awayTeam, mp: 0, w: 0, d: 0, l: 0, p: 0 };

            t[homeTeam].mp++;
            t[awayTeam].mp++;

            switch (result) {
                case 'win':
                    t[homeTeam].w++;
                    t[homeTeam].p += 3;
                    t[awayTeam].l++;
                    break;
                case 'loss':
                    t[awayTeam].w++;
                    t[awayTeam].p += 3;
                    t[homeTeam].l++;
                    break;
                case 'draw':
                    t[homeTeam].d++;
                    t[awayTeam].d++;
                    t[homeTeam].p++;
                    t[awayTeam].p++;
                    break;
            }
        });

      

        this._result = Object.keys(t)
            .map((team) => t[team])
            .sort((a, b) => {
                if (a.p > b.p) {
                    return -1;
                } else if (a.p < b.p) {
                    return 1;
                } else if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

        this._result.forEach((team) => {
            this._table.push(
                `${team.name.padEnd(30)} | ${String(team.mp).padStart(2)} | ${String(team.w).padStart(2)} | ${String(
                    team.d
                ).padStart(2)} | ${String(team.l).padStart(2)} | ${String(team.p).padStart(2)}`
            );
        });

        return this._table.join('\n');
    }
}