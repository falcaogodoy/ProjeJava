
import Header from "./components/Header";
import SalesCard from "./components/SalesCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return(
    <>
    <ToastContainer/>

   
    <Header/>
    <main>
        <section id="vendas">
            <div className="principal-container">
              <SalesCard/>
            </div>
        </section>
    </main>       
    </>
  ) 
}

export default App
