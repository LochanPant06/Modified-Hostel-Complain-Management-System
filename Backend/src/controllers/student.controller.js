import Student from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// phele saare details le le request body se
const registerStudent = asyncHandler(async (req, res) => {
  const {
    fullName,
    rollNo,
    year,
    hostelName,
    roomNo,
    collegeEmail,
    password,
  } = req.body;


  // agar missing hai koi bhi field to error de dena
  if (
    [
      fullName,
      rollNo,
      year,
      hostelName,
      roomNo,
      collegeEmail,
      password,
    ].some((field) => !field)
  ) {
    return res.status(400).json(
      new ApiResponse(400, null, "All fields are required")
    );
  }
// user already exist to error de dena
  const existedStudent = await Student.findOne({
    $or: [
      { collegeEmail },
      { rollNo }
    ],
  });

  if (existedStudent) {
    return res.status(409).json(
      new ApiResponse(409, null, "Student already exists")
    );
  }

  const student = await Student.create({
    fullName,
    rollNo,
    year,
    hostelName,
    roomNo,
    collegeEmail,
    password,
  });

  const createdStudent = await Student.findById(student._id).select(
    "-password"
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      createdStudent,
      "Student registered successfully"
    )
  );
});

const generateAccessAndRefreshTokens = async (studentId) => {

    const student = await Student.findById(studentId);

    const accessToken =
        student.generateAccessToken();

    const refreshToken =
        student.generateRefreshToken();

    student.refreshToken = refreshToken;

    await student.save({
        validateBeforeSave: false
    });

    return {
        accessToken,
        refreshToken
    };
};

const loginStudent = asyncHandler(async (req, res) => {

    const { collegeEmail, password } = req.body;

    if (!collegeEmail || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Email and password are required"
            )
        );
    }

    const student = await Student.findOne({
        collegeEmail
    });

    if (!student) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "Student not found"
            )
        );
    }

    const isPasswordValid =
        await student.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Invalid credentials"
            )
        );
    }

    const {
        accessToken,
        refreshToken
    } = await generateAccessAndRefreshTokens(
        student._id
    );

    const loggedInStudent =
        await Student.findById(student._id)
            .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false
    };

    return res
        .status(200)
        .cookie(
            "accessToken",
            accessToken,
            options
        )
        .cookie(
            "refreshToken",
            refreshToken,
            options
        )
        .json(
            new ApiResponse(
                200,
                {
                    student: loggedInStudent
                },
                "Login successful"
            )
        );
});

const refreshAccessToken = asyncHandler(
  async (req, res) => {

    const incomingRefreshToken =
      req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    // Verify Refresh Token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find Student
    const student = await Student.findById(
      decodedToken._id
    );

    if (!student) {
      return res.status(401).json({
        message: "Invalid Refresh Token"
      });
    }

    // Compare DB Refresh Token
    if (
      incomingRefreshToken !==
      student.refreshToken
    ) {
      return res.status(401).json({
        message: "Refresh Token Expired"
      });
    }

    // Generate New Tokens
    const {
      accessToken,
      refreshToken
    } = await generateAccessAndRefreshTokens(
      student._id
    );

    // Send New Cookies
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({
        accessToken,
        refreshToken
      });
});

const logoutStudent = asyncHandler(
  async (req, res) => {

    await Student.findByIdAndUpdate(
      req.user._id,
      {

        // removinng refresh token from db
        $unset: {
          refreshToken: 1
        }
      },
      {
        new: true
      }
    );

    const options = {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production"
    };

    return res
      .status(200)
      .clearCookie(
        "accessToken",
        options
      )
      .clearCookie(
        "refreshToken",
        options
      )
      .json(
        new ApiResponse(
          200,
          null,
          "Student logged out successfully"
        )
      );
});

const getCurrentStudent = asyncHandler(
  async (req, res) => {

    return res.status(200).json(
      new ApiResponse(
        200,
        req.user,
        "Current student fetched successfully"
      )
    );

});
export { registerStudent, loginStudent, generateAccessAndRefreshTokens, refreshAccessToken, logoutStudent,getCurrentStudent };