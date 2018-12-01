const apis = {
  localStorage: {
    read: function(name) {
      return JSON.parse(localStorage.getItem(name));
    },
    write: function(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
    }
  },
  remoteApi: {
    getData: function(name) {
      return fetch(`https://jsonplaceholder.typicode.com/${name}`)
      .then(res => res.json())
    },
    read: async function(name) {
      const fetched = await this.getData(name)
      console.log(fetched);
      return fetched;
    },
    write: function(name, data) {
      fetch(`https://jsonplaceholder.typicode.com/${name}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }
  }
}
