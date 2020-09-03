import { root, path, get, post, Response } from "summer-framework";
import { interviews } from "../Data";
import { InterviewEntities, InterviewerEntity } from "type";

@root("/v1/interviews")
class InterviewsResource {

  @path("")
  @get
  getList(): InterviewEntities {
    return interviews.list();
  }

  @path("")
  @post
  postItem(): InterviewerEntity {
    throw "error";
  }

  @path("/:id")
  @get
  getItem({ id }: { id: string }) {
    const found = interviews.get(id);
    if (found) {
      return found;
    }
    return new Response().status(404);
  }

}
