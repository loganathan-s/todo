/* This module handles all the Express api requests, this can be used for any URL. You just have to pass the URL & data */
class Request {
  
  /* Set Header for All the requests */
  static get HEADERS() {
    return  {
              "Accept":  "application/json, text/plain", 
              "Content-Type": "application/json"
            };
    }

  /* GET Request */
  static get(url){
    return fetch(url)
            .then(response => {
                if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
          })
   .catch(err => {
      throw new Error(err);
    });
  }
  

  /* POST Request */
  static post(url, data){
    return fetch(url, {method: "post", headers: this.HEADERS, body: JSON.stringify(data)})
           .then(response => {
              if (!response.ok) {
                 throw new Error(response.statusText);
              }
              return true;
            })
           .catch((err) => {
               throw new Error(err);
            });
  }

  
  /* PUT Request */
  static put(url, data){
    return fetch(url, {method: "put", headers: this.HEADERS, body: JSON.stringify(data)})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return true;
    })
    .catch(err => {
     throw new Error(err);
    });
  }


  /* DELETE Request */
  static delete(url){
      return fetch(url, {method: "delete", headers: this.HEADERS})
              .then(response => {
                  if (!response.ok) {
                  throw new Error(response.statusText);
                }
                return response.ok;
            })
     .catch(err => {
       throw new Error(err);
      });
    }
  
}

/* Default Export */
export default Request;