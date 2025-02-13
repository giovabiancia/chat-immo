import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import { RealEstateChat } from "./components/real-estate-chat";

function ChatWrapper() {
  let { id } = useParams();
  return <RealEstateChat id={id} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatWrapper />} />
        <Route path="/chat/:id" element={<ChatWrapper />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        transition={Bounce}
      />
    </Router>
  );
}

export default App;
