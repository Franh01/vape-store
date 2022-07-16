import axios from "axios";
//? Normal user:

export const signUp = (username, email, password) => {
  const error = null;
  axios
    .post(`${process.env.API_URL}/api/auth/signup`, {
      username,
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      error = err.response.data.message;
      console.log(err);
    })
    .finally(() => {
      error ? alert(error) : window.location.reload();
    });
};

export const logIn = (email, password) => {
  const error = null;
  axios
    .post("http://localhost:3001/api/auth/signin", {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      error = err.response.data.message;
      console.log(err);
    })
    .finally(() => {
      error ? alert(error) : window.location.reload();
    });
};

export const logout = () => {
  console.log(process.env.REACT_APP_API_URL);
  localStorage.removeItem("token");
  //   window.location.reload();
};

export const fetchProducts = async () => {
  const token = localStorage.getItem("token");
  return axios
    .get("http://localhost:3001/api/products", {
      // headers: {
      //     Authorization: `Bearer ${token}`,
      // },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//! Seller panel:

export const addProduct = async (name, brand, price, description, imgURL) => {
  const token = localStorage.getItem("token");
  return axios
    .post(
      "http://localhost:3001/api/products",
      {
        name,
        price,
        description,
        brand,
        imgURL,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//! Admin panel:

export const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  return axios
    .get("http://localhost:3001/api/users", {
      headers: {
        "x-access-token": token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
