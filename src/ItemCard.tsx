import { plant } from "./App";

interface itemcardProps {
  plant: plant;
  addToGarden: (plant: plant) => void;
}

export default function ItemCard({ plant, addToGarden }: itemcardProps) {
  return (
    <>
      <div className="card">
        <div className="inner">
          <h2>{plant.name}</h2>
          <img className="plantimg" src={plant.image} alt="" />

          <div className="facts">
            <img className="plantimgsm" src="/MyGarden/plant.svg" alt="" />
            <span>{plant.type}</span>
            <img className="plantimgsm" src="/MyGarden/sun.svg" alt="" />
            <span> {plant.sunlight} hours</span>
            <img className="plantimgsm" src="/MyGarden/tree.svg" alt="" />
            <span>
              {plant.height} {plant.height == 1 ? "foot" : "feet"}
            </span>
          </div>
        </div>
      </div>
      <div className="semicircle">
        <div className="innercirc" onClick={() => addToGarden(plant)}>
          <div className="btn">
            <img
              className="seeds"
              src="/MyGarden/seeds.svg"
              alt="seed add icon"
            />
            <p id="plus">+</p>
          </div>
        </div>
      </div>
    </>
  );
}
