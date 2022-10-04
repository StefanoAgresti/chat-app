export class User {
  constructor(
    public email: string,
    public displayName: string,
    public id: string,
    private _token: string,
    private _expirationDate: Date
  ) {}

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return null; // data attuale > data di scadenza token
    }
    return this._token;
  }
}
