import axios from "axios";
const localHost = "http://localhost:5000/";
const deployedHost = "https://zerotelcomeserver.herokuapp.com/";

let getLiens = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${deployedHost}lines/getlines`).then(result => {
      if (result.data.error) {
        console.log(result.data.error);
        return resolve({ error: "" });
      } else if (result.data.success === "") {
        return resolve({ success: true, lines: result.data.lines });
      }
    });
  });
};

let DAL = { getLiens: getLiens };

export default DAL;
