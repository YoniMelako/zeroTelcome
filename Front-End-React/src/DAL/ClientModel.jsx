import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const localHost = "http://localhost:5000/";
const deployedHost = "https://zerotelcomeserver.herokuapp.com/";

let Register = data => {
  return new Promise((resolve, reject) => {
    console.log(data);

    axios
      .post(`${deployedHost}users/register`, data)

      .then(result => {
        console.log(result.data);

        if (result.data.error) {
          return resolve({ error: result.data.error });
        } else if (result.data.success) {
          return resolve({ success: result.data.success });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

let Login = data => {
  return new Promise((resolve, reject) => {
    axios.post(`${deployedHost}users/login`, data).then(result => {
      console.log(result);

      if (result.data.error) {
        return resolve(false);
      } else if (result.data.success) {
        console.log(result.data.auth);

        cookies.set("auth", result.data.auth);
        return resolve(true);
      }
    });
  });
};

let getuserlines = () => {
  return new Promise((resolve, reject) => {
    if (cookies.get("auth") === undefined) {
      window.location("/login");
    } else {
      let data = {
        userToken: cookies.get("auth").token
      };

      axios.post(`${deployedHost}users/userlines`, data).then(result => {
        return resolve(result);
      });
    }
  });
};

let removelineFromUser = lineID => {
  if (cookies.get("auth") === undefined) {
    window.location("/login");
  } else {
    return axios.post(`${deployedHost}users/removeLine`, {
      userToken: cookies.get("auth").token,
      lineID: lineID
    });
  }
};

let DAL = {
  Register: Register,
  Login: Login,
  getuserlines: getuserlines,
  removelineFromUser: removelineFromUser
};

export default DAL;
