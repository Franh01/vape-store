import Head from "next/head";
import { useEffect, useState } from "react";
import {
  addProduct,
  fetchProducts,
  fetchUsers,
  logIn,
  logout,
  signUp,
} from "../components/actions";

export default function Home() {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleGetProducts = async () => {
    setProducts(await fetchProducts());
  };
  const handleGetUsers = async () => {
    setUsers(await fetchUsers());
    console.log(users);
  };
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [productValues, setProductValues] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    imgURL: "",
  });

  const handlePostProduct = async (e) => {
    // e.preventDefault();
    addProduct(
      productValues.name,
      productValues.description,
      productValues.brand,
      productValues.price,
      productValues.imgURL
    );
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    logIn(value.email, value.password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    signUp(value.username, value.email, value.password);
  };

  const handleChage = (e) => {
    setProductValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="ss" content="ss" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Login</h1>
      {!token ? (
        <div>
          <form onSubmit={(e) => handleSignUp(e)}>
            <label>
              Username:
              <input
                type="username"
                value={value.username}
                onChange={(e) =>
                  setValue({ ...value, username: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
              />
            </label>
            <button type="submit">SignUp</button>
          </form>
          <form onSubmit={(e) => onSubmit(e)}>
            <label>
              Email:
              <input
                type="email"
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <p>You are logged in.</p>
          <form onSubmit={(e) => handlePostProduct(e)}>
            <label>
              Name:
              <input
                type="name"
                value={productValues.name}
                onChange={(e) => handleChage(e)}
              />
            </label>
            <label>
              Description:
              <input
                type="description"
                value={productValues.description}
                onChange={(e) => handleChage(e)}
              />
            </label>
            <label>
              Price:
              <input
                type="price"
                value={productValues.price}
                onChange={(e) => handleChage(e)}
              />
            </label>
            <label>
              Brand:
              <input
                type="brand"
                value={productValues.brand}
                onChange={(e) => handleChage(e)}
              />
            </label>
            <label>
              Image:
              <input
                type="imgURL"
                value={productValues.imgURL}
                onChange={(e) => handleChage(e)}
              />
            </label>
            <button type="submit">Post product</button>
          </form>
        </div>
      )}
      <p>{token}</p>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => handleGetProducts()}>Get products</button>
      <button onClick={() => handleGetUsers()}>Get users</button>
      <button onClick={() => handlePostProduct()}>Post product</button>
      {products.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
