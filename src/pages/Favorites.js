import React from "react";
import Card from "../components/Card";
function Favorites({ items, onAddToFavorites }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mp-40 justify-between">
        <h1>My favorites</h1>
      </div>
      <div className="d-flex flex-wrap">
        {items.map((el) => {
          return (
            <Card
              key={el.id}
              title={el.title}
              price={el.price}
              imageUrl={el.imageUrl}
              isFavorite={true}
              // onPlusClick={(obj) => onAddToCard(obj)}
              onAddToFavorites={(obj) => onAddToFavorites(obj)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
