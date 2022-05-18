import React from "react";
import Card from "../components/Card";
function Home({
  items,
  searchValue,
  onAddToCard,
  onAddToFavorites,
  onChangeSearchInput,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mp-40 justify-between">
        <h1>{searchValue ? `Search by: "${searchValue}"` : "All sneakers"}</h1>
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
                onAddToFavorites={(obj) => onAddToFavorites(obj)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;
