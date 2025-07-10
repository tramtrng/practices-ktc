//App.tsx
import LoginForm from "./components/Afternoon_W2_D8/Form_Login/LoginForm";
import AuthPage from "./components/Afternoon_W2_D8/Form-In-Up/Pages/AuthPage";
import RegisterForm from "./components/Afternoon_W2_D8/Form_Register/RegisterForm";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "40px" }}>
      
      {/* Lab 1 Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Lab 1 - Auth Page</h2>
        <AuthPage />
      </div>

      {/* Lab 2 Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Lab 2 - Register Form</h2>
        <RegisterForm />
      </div>

      {/* Lab 3 Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Lab 3 - Đăng nhập hệ thống</h2>
        <div className="min-h-screen flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img
              src="/images/lab3.PNG"
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
            {/* Text overlay ở phần trên cùng của ảnh */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6">
              <div className="text-left">
                <h1 className="text-xl md:text-3xl font-bold leading-tight text-gray-800">
                  Set Your Partner
                  <br />
                  Recruitment on <span className="text-blue-600">Auto-Pilot</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 py-8">
            <div className="max-w-sm w-full">
              {/* Wrap LoginForm để ẩn phần tiêu đề bị lệch */}
              <div className="[&>div:first-child]:hidden">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
