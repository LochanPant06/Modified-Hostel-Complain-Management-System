// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api/v1",
//   withCredentials: true,
// });

// export default api;


// --------------------------------------- After Adding Proxy 
// import axios from "axios";

// const api = axios.create({
//   baseURL: "/api/v1",
//   withCredentials: true,
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://modified-hostel-complain-management-nvsg.onrender.com/api/v1",
  withCredentials: true,
});

export default api;