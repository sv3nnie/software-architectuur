class Movie {
  private title: String;

  constructor(title: String) {
    this.title = title;
  }

  addScreening(screening: MovieScreening): void {}

  toString() {
    return this.title;
  }
}
