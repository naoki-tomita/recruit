import { useState } from "react";
import { NextPage } from "next";
import { login, create } from "../lib/Requests";

async function _login(name: string, password: string) {
  await login(name, password);
  location.href = "/";
}

async function _create(name: string, password: string) {
  await create(name, password);
  await _login(name, password);
}

const Index: NextPage = () => {
  const [state, setState] = useState({ name: "", password: "" });
  return (
    <>
    <div><input value={state.name} onChange={e => setState({ ...state, name: e.target.value })}/></div>
    <div><input value={state.password} type="password" onChange={e => setState({ ...state, password: e.target.value })}/></div>
    <div><button onClick={() => _login(state.name, state.password)} >login</button></div>
    <div><button onClick={() => _create(state.name, state.password)} >create</button></div>
    </>
  );
};

export default Index;
