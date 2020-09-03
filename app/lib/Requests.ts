import axios from "axios";
import {CandidateEntities, InterviewerEntity} from "type";

function origin() {
  return process.browser ? "" : "http://localhost:3002";
}

export async function login(name: string, password: string) {
  return await (await axios.post(`${origin()}/v1/auth/login`, { name, password })).data;
}

export async function create(name: string, password: string) {
  return await (await axios.post(`${origin()}/v1/auth/create`, { name, password })).data;
}

export async function fetchCandidates(): Promise<CandidateEntities> {
  return await (await axios.get(`${origin()}/v1/candidates`)).data;
}

export async function fetchMeInfo(cookie: any): Promise<InterviewerEntity | {}> {
  return await (await axios.get(`${origin()}/v1/auth/me`, { headers: { cookie } })).data;
}
