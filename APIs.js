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
    },
    read: async function(name) {
      const fetched = await this.getData(name)
      const data = await fetched.json();
      return data;
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
    }
  }
}
