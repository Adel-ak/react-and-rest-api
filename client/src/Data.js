import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    const res = await response.json();
    if (response.status === 200) {
      return res;
    }
    else if (response.status === 401) {
      return{
        isNull: true,
        errors: [ 'Sign-in was unsuccessful' ]
      };
    }
    else {
      if(res.hasOwnProperty('message'))throw res;
      else throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      const res = await response.json()
      return res.message;
    }
    else {
      throw new Error()
    };
  }

  async getCourses(path) {
    const response = await this.api(path, 'GET');
    const res = await response.json()
    if (response.status === 200) {
      return res;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      if(res.hasOwnProperty('message'))throw res;
      else throw new Error();
    }
  }

  async createCourses(path,courses,username, password) {
    const response = await this.api(path, 'POST',courses, true, { username, password });       
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      const res = await response.json()
      return res.message;
    }
    else {
      throw new Error()
    };
  }

  async deleteCourses(path, username, password) {
    const response = await this.api(path, 'DELETE', null, true, { username, password });       
    console.log(response);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      const res = await response.json()
      return res.message;
    }
    else {
      throw new Error()
    };
  }
  
  
}

