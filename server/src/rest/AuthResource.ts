import { root, post, path, auth, Response, handle, get } from "summer-framework";
import { auths, sessions, interviewers,  } from "../Data";
import { InterviewerEntity } from "type";

const SESSION_NAME = "CLOPNBEHSESSION";

export interface AuthInfo {
  interviewer: InterviewerEntity | undefined;
}

@root("/v1/auth")
class AuthResource {

  @path("/create")
  @post
  create({}, {}, { name, password }: { name: string, password: string }) {
    const interviewer = interviewers.add({ name });
    auths.create(interviewer.id, name, password);
    return new Response().status(201);
  }

  @path("/login")
  @post
  login({}, {}, { name, password }: { name: string, password: string }) {
    const result = auths.verify(name, password);
    if (result) {
      const session = sessions.create(result.interviewer);
      return new Response().status(200).headers({ "set-cookie": `${SESSION_NAME}=${session.id}; path=/;` });
    }
    throw new FailedToLoginException("name or password are not matched.");
  }

  @path("/logout")
  @post
  logout() {
    return new Response().status(200).headers({ "set-cookie": `${SESSION_NAME}=; path=/;` });
  }

  @path("/me")
  @get
  me({}, {}, {}, { authResult }: { authResult: AuthInfo }): InterviewerEntity | {} {
    return authResult.interviewer || {};
  }

  @auth
  verifyAuth(cookies: any): AuthInfo | undefined {
    const sessionId = cookies[SESSION_NAME];
    const session = sessions.verify(sessionId);
    if (session) {
      const interviewer = interviewers.get(session?.interviewer);
      if (interviewer) {
        return { interviewer }
      }
    }
    return { interviewer: undefined };
  }

}

class FailedToLoginException implements Error {
  name: string = "FailedToLoginException";
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.message = message;
    Error.captureStackTrace(this);
  }
}

class FailedToLoginExceptionHandler {
  @handle(FailedToLoginException)
  handle<T extends Error>(_error: T) {
    return { status: 403, body: {} };
  }
}
