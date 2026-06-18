import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { fullName, employeeId, designation, officialEmail, password } =
    req.body;

  // Validation
  if (
    [fullName, employeeId, designation, officialEmail, password].some(
      (field) => !field,
    )
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  // Check existing admin
  const existedAdmin = await Admin.findOne({
    $or: [{ officialEmail }, { employeeId }],
  });

  if (existedAdmin) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "Admin already exists"));
  }

  // Create admin
  await Admin.create({
    fullName,
    employeeId,
    designation,
    officialEmail,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Admin registered successfully"));
});
const generateAccessAndRefreshTokens = async (adminId) => {
  const admin = await Admin.findById(adminId);

  const accessToken = admin.generateAccessToken();

  const refreshToken = admin.generateRefreshToken();

  admin.refreshToken = refreshToken;

  await admin.save({
    validateBeforeSave: false,
  });

  return {
    accessToken,
    refreshToken,
  };
};
const loginAdmin = asyncHandler(async (req, res) => {
  const { officialEmail, password } = req.body;

  if (!officialEmail || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Email and password are required"));
  }

  const admin = await Admin.findOne({
    officialEmail,
  });

  if (!admin) {
    return res.status(404).json(new ApiResponse(404, null, "Admin not found"));
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id,
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
        },
        "Login successful",
      ),
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Refresh token not found"));
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const admin = await Admin.findById(decodedToken._id);

  if (!admin) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid refresh token"));
  }

  if (incomingRefreshToken !== admin.refreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Refresh token expired or used"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id,
  );

  const options = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed successfully",
      ),
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "Admin logged out successfully"));
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current admin fetched successfully"));
});

export {
  registerAdmin,
  generateAccessAndRefreshTokens,
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
};
