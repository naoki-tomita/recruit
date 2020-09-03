export interface CandidateEntities {
  candidates: CandidateEntity[];
}

export enum FromType {
  Workable,
  Wantedly,
  Referral,
  Direct,
  Agent,
  Draft,
}

export interface CandidateEntity {
  id: string;
  name: string;
  age: number;
  from: FromType;
}

export interface InterviewerEntitys {
  interviewers: InterviewerEntity[];
}

export interface InterviewerEntity {
  id: string;
  name: string;
}

export interface InterviewEntities {
  interviews: InterviewEntity[];
}

export interface InterviewEntity {
  id: string;
  interviewer: InterviewerEntity;
  candidate: CandidateEntity;
  memo: string;
}

export interface RawInterviewEntity {
  id: string,
  interviewer: string,
  candidate: string,
  memo: string
}

export interface Session {
  id: string;
  interviewer: string;
}

export interface LoginInfo {
  interviewer: string;
  name: string;
  encryptedPassword: string;
}
