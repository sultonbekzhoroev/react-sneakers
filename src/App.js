import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CardDrawer from "./components/CardDrawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useEffect, useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cardOpened, setCardOpened] = useState(false);

  const callApi = async () => {
    const res = await axios.get(
      "https://6273657a6b04786a0905678d.mockapi.io/items"
    );
    setItems(res.data);
    const response = await axios.get(
      "https://6273657a6b04786a0905678d.mockapi.io/cart"
    );
    setCartItems(response.data);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("https://6273657a6b04786a0905678d.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  useEffect(() => {
    callApi();
  }, []);

  const onAddToCard = (obj) => {
    axios.post("https://6273657a6b04786a0905678d.mockapi.io/cart", obj);

    setCartItems([...cartItems, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6273657a6b04786a0905678d.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorites = (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(
        `https://6273657a6b04786a0905678d.mockapi.io/favorites/${obj.id}`
      );
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post("https://6273657a6b04786a0905678d.mockapi.io/favorites", obj);
      setFavorites((prev) => [...prev, obj]);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <CardDrawer
          items={cartItems}
          onClose={() => setCardOpened(false)}
          onRemoveItem={onRemoveItem}
        />
      )}

      <Header OnClickCard={() => setCardOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCard={onAddToCard}
              onAddToFavorites={onAddToFavorites}
              onChangeSearchInput={onChangeSearchInput}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorites={onAddToFavorites} />
          }
        ></Route>
      </Routes>
    </div>
  );
}
