import { listen } from "summer-framework";
import "./src/rest/InterviewersResource";
import "./src/rest/CandidatesResource";
import "./src/rest/AuthResource";
import "./src/rest/InterviewsResource";

listen(3002);
