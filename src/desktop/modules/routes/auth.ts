import * as _ from "lodash";
import Response from "./../utils/response";
import { manifest } from "./../manifest";
import AuthController from "../controllers/authController";

export default (app, proxyURL) => {

    const authController = new AuthController(manifest);
    app.post(
        "/api/user/v1/startSession", authController.startUserSession.bind(authController),
    );
    
}