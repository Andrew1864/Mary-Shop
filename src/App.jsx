import "./index.css";
import Header from "./components/ui/Header/Header";
import Home from "./pages/Home";
// import { Card } from "./components/ui/Card/Card";

// Данные карточек (продукты)
// const initialProducts = [
//   {
//     id: "1",
//     name: "Armchair",
//     category: "Chair",
//     description:
//       "At IKEA we want to put well-designed, affordable home furnishing within",
//     rating: "4.9",
//     price: "50.2",
//     imgSrc: "../assets/products/product-1.jpg",
//   },
//   {
//     id: "2",
//     name: "Bed",
//     category: "Bed",
//     description:
//       "At IKEA we want to put well-designed, affordable home furnishing within2",
//     rating: "3.0",
//     price: "102.10",
//     imgSrc: "../assets/products/product-2.jpg",
//   },
//   {
//     id: "3",
//     name: "Bench",
//     category: "Bench",
//     description:
//       "At IKEA we want to put well-designed, affordable home furnishing within3",
//     rating: "4.9",
//     price: "15",
//     imgSrc: "../assets/products/product-3.jpg",
//   },
//   {
//     id: "4",
//     name: "Bed 2",
//     category: "Bed 2",
//     description:
//       "At IKEA we want to put well-designed, affordable home furnishing withi4",
//     rating: "3.0",
//     price: "102.10",
//     imgSrc: "../assets/products/product-4.jpg",
//   },
//   {
//     id: "5",
//     name: "Bench2",
//     category: "Bench",
//     description:
//       "At IKEA we want to put well-designed, affordable home furnishing within5",
//     rating: "3.2",
//     price: "12",
//     imgSrc: "../assets/products/product-5.jpg",
//   },
//   {
//     id: "6",
//     name: "Bed2",
//     category: "Bed",
//     description:
//       "At IKEA we want to put well-designed, affordable home furnishing within6",
//     rating: "1.0",
//     price: "105.80",
//     imgSrc: "../assets/products/product-8.jpg",
//   },
// ];

function App() {
  return (
    <>
      <Header />
      <main className="bg-[#F2F0F1]">
        <Home  className="bg-[#F2F0F1]" />
      </main>
    </>
  );
}

export default App;
