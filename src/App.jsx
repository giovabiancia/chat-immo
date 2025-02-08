import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import { RealEstateChat } from "./components/real-estate-chat";

function App() {
  return (
    <>
      <RealEstateChat></RealEstateChat>
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
    </>
  );
}

export default App;
