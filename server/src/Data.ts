import { CandidateEntities, CandidateEntity, InterviewerEntity, InterviewerEntitys, InterviewEntities, InterviewEntity, RawInterviewEntity, Session, LoginInfo } from "type";

class CandidateManager {
  _list: CandidateEntity[] = [];
  add(item: Omit<CandidateEntity, "id">): CandidateEntity {
    const created: CandidateEntity = {
      ...item,
      id: random(),
    }
    this._list.push(created);
    return created;
  }

  get(id: string): CandidateEntity | undefined {
    return this._list.find(it => it.id === id);
  }

  list(): CandidateEntities {
    return { candidates: this._list };
  }

  get raw() {
    return this._list;
  }
}

class InterviewerManager {
  _list: InterviewerEntity[] = [];
  add(item: Pick<InterviewerEntity, "name">): InterviewerEntity {
    const created: InterviewerEntity = {
      name: item.name,
      id: random(),
    }
    this._list.push(created);
    return created;
  }

  get(id: string): InterviewerEntity | undefined {
    return this._list.find(it => it.id === id);
  }

  list(): InterviewerEntitys {
    return { interviewers: this._list };
  }

  get raw() {
    return this._list;
  }
}


class InterviewManager {
  _list: RawInterviewEntity[] = [];

  list(): InterviewEntities {
    return { interviews: this._list.map(it => this.get(it.id)!) }
  }

  add(candidate: string, interviewer: string, memo: string): InterviewEntity {
    const id = random();
    this._list.push({ id, candidate, interviewer, memo });
    return this.get(id)!;
  }

  get(id: string): InterviewEntity | undefined {
    const found = this._list.find(it => it.id === id);
    if (!found) {
      return undefined;
    }
    const candidate = candidates.raw.find(it => it.id === found.candidate);
    const interviewer = interviewers.raw.find(it => it.id === found.interviewer);
    if (!candidate || !interviewer) {
      return undefined;
    }
    return {
      ...found,
      candidate,
      interviewer,
    }
  }
}

class SessionManager {
  sessions: Map<string, string> = new Map();
  create(interviewer: string): Session {
    const id = random();
    this.sessions.set(interviewer, id);
    return { interviewer, id };
  }

  verify(id: string): Session | undefined {
    const session = [...this.sessions.entries()].find(([_, value]) => value === id);
    if (session) {
      return { interviewer: session[0], id };
    }
    return undefined;
  }
}

class AuthManager {
  _list: LoginInfo[] = [];

  create(interviewer: string, name: string, password: string) {
    const loginInfo = {
      interviewer, name,
      encryptedPassword: Buffer.from(password).toString("base64")
    };
    this._list.push(loginInfo);
    return loginInfo;
  }

  verify(name: string, password: string) {
    const encryptedPassword = Buffer.from(password).toString("base64")
    const loginInfo = this._list.find(it => it.name === name && it.encryptedPassword === encryptedPassword);
    return loginInfo;
  }
}

export const candidates = new CandidateManager();
export const interviewers = new InterviewerManager();
export const interviews = new InterviewManager();
export const sessions = new SessionManager();
export const auths = new AuthManager();

function random() {
  return Math.random().toString(32).substring(2)
}
