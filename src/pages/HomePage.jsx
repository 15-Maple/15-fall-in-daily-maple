import Header from "../components/Header";
import Recentlogs from "../components/RecentStudies";
import StudyList from "../components/StudyList";
import "../styles/home.css";

function HomePage() {
  return (
    <>
        <Header />
        
      <main className="home-page">
      <Recentlogs />
      <StudyList />
    </main>
    </>
  );
}

export default HomePage;
