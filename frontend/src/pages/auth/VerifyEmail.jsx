import { useState } from "react";

const VerifyEmail = () => {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-blue-600">Linked</span>
          <span className="text-2xl font-bold text-black">in</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center">Confirm your email</h2>
        <p className="text-gray-600 text-center mt-2">
          Type in the code we sent to <strong>youremail@example.com</strong>.{" "}
          <span className="text-blue-500 cursor-pointer">Edit email</span>
        </p>

        {/* Code Input */}
        <div className="mt-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="------"
            maxLength={6}
            className="w-full text-center text-2xl tracking-widest border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Privacy Notice */}
        <div className="mt-4 p-3 bg-gray-100 text-sm text-gray-700 rounded-md">
          <p>
            <strong>Your privacy is important</strong>
          </p>
          <p className="mt-1">
            We may send you member updates, recruiter messages, job suggestions,
            invitations, reminders, and promotional messages from us and our
            partners. You can change your{" "}
            <span className="text-blue-500 cursor-pointer">preferences</span> anytime.
          </p>
        </div>

        {/* Resend Code */}
        <div className="text-center mt-4 text-gray-700">
          <p>
            Didn't receive the code?{" "}
            <span className="text-blue-500 cursor-pointer">Send again</span>
          </p>
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-4 py-3 text-gray-400 bg-gray-200 rounded-lg font-semibold cursor-not-allowed"
          disabled
        >
          Agree & Confirm
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
