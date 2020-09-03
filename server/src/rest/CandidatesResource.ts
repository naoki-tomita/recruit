import { root, path, get, post, Response } from "summer-framework";
import { candidates } from "../Data";
import { CandidateEntity, CandidateEntities } from "type";

@root("/v1/candidates")
class CandidatesResource {

  @path("")
  @get
  getList(): CandidateEntities {
    return candidates.list();
  }

  @path("")
  @post
  postItem(_p: any, _q: any, body: Omit<CandidateEntity, "id">): CandidateEntity {
    return candidates.add(body);
  }

  @path("/:id")
  @get
  getItem({ id }: { id: string }) {
    const found = candidates.get(id);
    if (found) {
      return found;
    }
    return new Response().status(404);
  }

}
