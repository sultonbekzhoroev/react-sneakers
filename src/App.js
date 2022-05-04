import Card from "./components/Card";
import axios from "axios";
import Header from "./components/Header";
import CardDrawer from "./components/CardDrawer";
import { useEffect, useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cardOpened, setCardOpened] = useState(false);

  const callApi = async () => {
    const res = await axios.get(
      "https://626f31b6f75bcfbb35749a26.mockapi.io/items"
    );
    setItems(res.data);
    const response = await axios.get(
      "https://626f31b6f75bcfbb35749a26.mockapi.io/cart"
    );
    setCartItems(response.data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const onAddToCard = (obj) => {
    axios.post("https://626f31b6f75bcfbb35749a26.mockapi.io/cart", obj);

    setCartItems([...cartItems, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://626f31b6f75bcfbb35749a26.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
      <div className="content p-40">
        <div className="d-flex align-center mp-40 justify-between">
          <h1>
            {searchValue ? `Search by: "${searchValue}"` : "All sneakers"}
          </h1>
          <div className="search-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="search..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap mt-10">
          {items
            .filter((item) =>
              item.title
                .toString()
                .toLowerCase()
                .includes(searchValue.toString().toLowerCase())
            )
            .map((el) => {
              return (
                <Card
                  key={el.id}
                  title={el.title}
                  price={el.price}
                  imageUrl={el.imageUrl}
                  onPlusClick={(obj) => onAddToCard(obj)}
                  onClickFavorite={() => console.log("el")}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
