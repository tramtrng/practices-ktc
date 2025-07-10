import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter?: boolean;
  terms: boolean;
};

export default function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Register Data:", data);
    alert("Account created successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f2f4f8",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          height: "90vh",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "linear-gradient(to bottom right, #1e90ff, #007bff)",
            color: "white",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{ fontSize: "28px", fontWeight: "bold", lineHeight: "1.4" }}
          >
            A few clicks away <br />
            from creating your <br />
            Lottery Display
          </h2>
          <img
            src="./img/22.jpg"
            alt="Lottery Display"
            style={{ width: "250px", marginTop: "40px", alignSelf: "center" }}
          />
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "400px", padding: "40px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Register</h2>
            <p style={{ marginBottom: "20px", color: "#555" }}>
              Manage all your lottery efficiently
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "grid", gap: "12px" }}
            >
              {/* First + Last Name */}
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  style={inputStyle}
                />
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  style={inputStyle}
                />
              </div>

              {/* Phone + Email */}
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  {...register("phoneNumber")}
                  placeholder="Phone Number"
                  style={inputStyle}
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  style={inputStyle}
                />
              </div>

              {/* Password + Confirm */}
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    type={showPwd ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    style={{ ...inputStyle, paddingRight: "60px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={toggleButtonStyle}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    style={{ ...inputStyle, paddingRight: "60px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={toggleButtonStyle}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div>
                <label>
                  <input type="checkbox" {...register("newsletter")} /> Yes, I
                  want to receive Lottery Display emails
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    {...register("terms", { required: true })}
                  />{" "}
                  I agree to all the{" "}
                  <a href="#" style={{ color: "#2563eb" }}>
                    Terms, Privacy Policy and Fees
                  </a>
                </label>
                {errors.terms && (
                  <p style={{ color: "red" }}>You must accept the terms.</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid}
                style={{
                  backgroundColor: isValid ? "#2563eb" : "#ccc",
                  color: "white",
                  padding: "14px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: isValid ? "pointer" : "not-allowed",
                }}
              >
                Create Account
              </button>

              {/* Log In link */}
              <p style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <a href="#" style={{ color: "#2563eb", fontWeight: "500" }}>
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

const toggleButtonStyle: React.CSSProperties = {
  position: "absolute",
  right: "12px",
  top: "12px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#2563eb",
  fontWeight: "bold",
};
