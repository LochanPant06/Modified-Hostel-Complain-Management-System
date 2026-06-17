import jwt from "jsonwebtoken";

import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace(
            "Bearer ",
            ""
        );

    if (!token) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Unauthorized request"
            )
        );
    }

    const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    let user;

if (decodedToken.role === "student") {

    user = await Student.findById(
        decodedToken._id
    ).select("-password -refreshToken");

    user.role = "student";

} else if (decodedToken.role === "admin") {

    user = await Admin.findById(
        decodedToken._id
    ).select("-password -refreshToken");

    user.role = "admin";
}

    if (!user) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Invalid Access Token"
            )
        );
    }

    req.user = user;

    next();
});

export { verifyJWT };