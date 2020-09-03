import { NextPage } from "next";
import { InterviewerEntity } from "type";
import { useState } from "react";

interface Props {
  user: InterviewerEntity;
}

interface State {
  name: string;
}

const Interviewer: NextPage<Props> = ({ user }) => {
  const [state, setState] = useState<State>({ name: user.name });
  return (
    <>
    <div>
      name:
      <input
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })} />
    </div>
    </>
  );
}

export default Interviewer;
