import { useContext, useState } from "react";
import styled from "styled-components";
import { api } from "../../api";
import { ModalContext } from "../../contexts/modalContext";
import { UserContext } from "../../contexts/userContext";
import Signup from "../Signup";

export default function Signin() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setModal, setModalContent } = useContext(ModalContext);

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.signin(data);
      setUser({ ...response.data });
      setModal(false);
    } catch (err) {
      alert("Error while trying to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Login>
      <h1>Sign-in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className={loading ? "disabled" : null}
            name="email"
            type="email"
            placeholder="email"
            disabled={loading}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password
          <input
            className={loading ? "disabled" : null}
            name="password"
            type="password"
            placeholder="password"
            disabled={loading}
            onChange={handleInputChange}
          />
        </label>
        <button
          className={
            loading || !data?.email || !data?.password ? "disabled" : null
          }
          type="submit"
          disabled={loading}
        >
          login
        </button>
        <button
          onClick={() => {
            setModalContent(<Signup />);
          }}
          type="button"
        >
          Create account
        </button>
      </form>
      <Redirect onClick={() => setModal(false)}>Play as a guest</Redirect>
    </Login>
  );
}

const Login = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  padding: 10px 0;

  .disabled {
    border: 1px solid #fff;
    color: #fff !important;
    opacity: 0.8;
  }

  h1 {
    font-weight: 500;
  }

  form {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 15px;
  }

  form::after {
    content: " ";
    width: 300px;
    height: 1px;
    background-color: #1a1a1b;
  }

  input,
  button {
    width: 300px;
    height: 50px;
    border-radius: 5px;
    border: none;
    border-radius: 1.625rem;
  }

  button {
    width: 30%;
    height: 40px;
    border: 1px solid #538d4e;
    color: #538d4e !important;
    background-color: #0000;
    color: #fff;
    border-radius: 1.625rem;
  }

  button:hover {
    cursor: pointer;
  }

  & button:last-child {
    border-radius: 1.625rem;
    border: 1px solid #fff;
    color: #fff !important;
  }

  input {
    padding-left: 15px;
    background-color: #eee;
  }

  label {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
  }
`;

const Redirect = styled.div`
  display: inline;
  font-weight: 300;
  font-size: 12px;
  color: #eee;
  text-decoration: underline;
  margin: 5px 0;

  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;
