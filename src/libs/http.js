class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http get method error:\n', err);
      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body: body,
      });
      let json = await req.json();

      return json;
    } catch (err) {
      console.log('http post method error:\n', err);
      throw Error(err);
    }
  };

  delete = async (url) => {
    try {
      let req = await fetch(url, {
        method: 'DELETE',
      });
      let json = await req.json();

      return json;
    } catch (err) {
      console.log('http delete method error:\n', err);
      throw Error(err);
    }
  };

  put = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'PUT',
        body: body,
      });
      let json = await req.json();

      return json;
    } catch (err) {
      console.log('http put method error:\n', err);
      throw Error(err);
    }
  };
}

export default Http;
