const apis = {
  localStorage: {
    read: function(name) {
      return localStorage.getItem(name);
    },
    write: function(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
    }
  },
  remoteApi: {
    read: function(name) {
        // placeholder for remote api read
    },
    write: function(name, data) {
        // placeholder for remote api write
    }
  }
}
