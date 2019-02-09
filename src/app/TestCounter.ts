export default class TestCounter {
    private n: number;
    public constructor() {
        this.n = 0;
    }

    public getNumber(): number {
        return this.n;
    }

    public setNumber(n: number): void {
        this.n = n;
    }
}