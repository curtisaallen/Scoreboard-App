export function getNBA() {
    return fetch('http://localhost:5001/nba')
      .then(data => data.json())
}