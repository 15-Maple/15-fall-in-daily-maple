import logo from "../assets/ic-logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="fall in daily" className="logo-image" />

      <button className="create-logs-button">스터디 만들기</button>
    </header>
  );
}

export default Header;
