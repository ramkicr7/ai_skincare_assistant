import logo from "../assets/logo.png";

export default function SplashScreen() {
  console.log("LOGO PATH:", logo);

  return (
    <div style={{ background: "black", height: "100vh" }}>
      <h1 style={{ color: "white" }}>Testing Image</h1>

      <img
        src={logo}
        alt="logo"
        style={{ width: "200px", border: "2px solid red" }}
      />
    </div>
  );
}