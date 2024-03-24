import { Button } from "@chakra-ui/react";
import { plantval } from "./App";
import { plant } from "./App";

interface GardenCardProps {
  plant: plantval;
  decreaseCount: (plant: plant) => void;
  removeFromGarden: (plant: plant) => void;
}

export default function GardenCard({
  plant,
  decreaseCount,
  removeFromGarden,
}: GardenCardProps) {
  return (
    <>
      <img className="imgcard" src={plant.plant.image} alt="plant icon" />
      <div className="info">
        <div className="text">
          <h3 className="name">{plant.plant.name}</h3>
          <h3>x{plant.count}</h3>
        </div>

        <div className="x">
          <Button
            className="xbtn"
            colorScheme="green"
            onClick={() => decreaseCount(plant.plant)}
          >
            -1
          </Button>
          <Button
            className="xbtn"
            colorScheme="pink"
            onClick={() => removeFromGarden(plant.plant)}
          >
            X
          </Button>
        </div>
      </div>
    </>
  );
}
