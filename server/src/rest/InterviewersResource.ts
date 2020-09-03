import { root, path, get, post, Response } from "summer-framework";
import { interviewers } from "../Data";
import { InterviewerEntitys } from "type";

@root("/v1/interviewers")
class InterviewersResource {

  @path("")
  @get
  getList(): InterviewerEntitys {
    return interviewers.list();
  }

  // @path("")
  // @post
  // postItem(_p: any, _q: any, body: { name: string, password: string }): InterviewerEntity {
  //   return interviewers.add(body);
  // }

  @path("/:id")
  @get
  getItem({ id }: { id: string }) {
    const found = interviewers.get(id);
    if (found) {
      return found;
    }
    return new Response().status(404);
  }

}
