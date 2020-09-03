import { NextPage } from "next";
import axios from "axios";
import { fetchCandidates } from "../lib/Requests";

interface Candidate {
  name: string;
  age: number;
}

interface Props {
  candidates: Candidate[];
}

const Index: NextPage<Props> = ({ candidates }) => {
  return (
    <>
    <div>Index</div>
    <div><a href="/interviewer">my info</a></div>
    <div><a href="/candidates/new">new</a></div>
    <ul>
      {candidates.map(it => <div>{it.name}/{it.age}</div>)}
    </ul>
    </>
  );
};

Index.getInitialProps = async function(): Promise<Props> {
  return await fetchCandidates();
}

export default Index;
