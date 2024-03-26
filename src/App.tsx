import "./App.css";
import { Button, ChakraProvider, Select, Stack } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import plants from "./data.json";
import { useEffect, useState } from "react";
import GardenCard from "./GardenCard";
import ItemCard from "./ItemCard";

export interface plant {
  name: string;
  type: string;
  sunlight: number;
  height: number;
  image: string;
}

export interface plantval {
  plant: plant;
  count: number;
}

function App() {
  const [sortBySizeChecked, setSortBySizeChecked] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState<plant[]>(plants);
  const [garden, setGarden] = useState<plantval[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    const getFilter = () => {
      let filtered: plant[] = plants;
      if (hours == 0 && !type.trim()) {
        setFilteredPlants(plants);
      } else if (hours == 0) {
        filtered = plants.filter((plant) => {
          return plant.type == type;
        });
      } else if (!type.trim()) {
        filtered = plants.filter((plant) => {
          return plant.sunlight == hours;
        });
      } else {
        filtered = plants.filter((plant) => {
          return plant.type == type && plant.sunlight == hours;
        });
      }
      if (sortBySizeChecked) {
        filtered = [...filtered].sort((a, b) => a.height - b.height);
      }
      setFilteredPlants(filtered);
    };
    getFilter();
  }, [hours, type, sortBySizeChecked, filteredPlants]);

  const addToGarden = (newPlant: plant) => {
    const existingPlantIndex = garden.findIndex(
      (plantval) => plantval.plant.name === newPlant.name
    );
    if (existingPlantIndex !== -1) {
      const updatedGarden = [...garden];
      updatedGarden[existingPlantIndex].count += 1;
      setGarden(updatedGarden);
    } else {
      setGarden([...garden, { plant: newPlant, count: 1 }]);
    }
    setTotal((prevTotal) => prevTotal + 1);
  };
  const decreaseCount = (plant: plant) => {
    const updatedGarden = [...garden];
    const plantIndex = updatedGarden.findIndex(
      (plantval) => plantval.plant.name === plant.name
    );
    if (plantIndex !== -1) {
      if (updatedGarden[plantIndex].count > 0) {
        updatedGarden[plantIndex].count--;
        setTotal((prevTotal) => prevTotal - 1);
        if (updatedGarden[plantIndex].count === 0) {
          removeFromGarden(plant);
          return;
        }
      }
      setGarden(updatedGarden);
    }
  };
  const removeFromGarden = (plantToRemove: plant) => {
    const plantIndexToRemove = garden.findIndex(
      (plantval) => plantval.plant.name === plantToRemove.name
    );
    if (plantIndexToRemove !== -1) {
      const removedCount = garden[plantIndexToRemove].count;
      const updatedGarden = [...garden];
      updatedGarden.splice(plantIndexToRemove, 1);
      setGarden(updatedGarden);
      setTotal((prevTotal) => prevTotal - removedCount);
    }
  };

  return (
    <>
      <ChakraProvider>
        <main>
          <div className="top">
            <img id="tulip" src="/MyGarden/tulip.svg" alt="Tulip icon" />
            <h1>My Garden</h1>
          </div>
          <div className="content">
            <div className="gardencontent">
              <div className="garden">
                <div className="items">
                  {garden.map((plant) => (
                    <div key={plant.plant.name} className="itemcard">
                      <GardenCard
                        plant={plant}
                        decreaseCount={decreaseCount}
                        removeFromGarden={removeFromGarden}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="total">
                <h1>Number of plants in my garden: {total} </h1>
              </div>
            </div>
            <div className="plants">
              <div className="filters">
                <Select
                  placeholder="Plant Type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="">All</option>
                  <option value="Flower">Flower</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Grass">Grass</option>
                  <option value="Succulent">Succulent</option>
                  <option value="Vegetable">Vegetable</option>
                </Select>
                <Select
                  placeholder="Hours of Sun"
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  value={hours}
                >
                  <option value={0}>All</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                </Select>
                <Stack spacing={5} direction="row">
                  <Checkbox
                    colorScheme="green"
                    isChecked={sortBySizeChecked}
                    onChange={() =>
                      sortBySizeChecked
                        ? setSortBySizeChecked(false)
                        : setSortBySizeChecked(true)
                    }
                  >
                    Sort by Size
                  </Checkbox>
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      setFilteredPlants(plants);
                      setHours(0);
                      setType("");
                      setSortBySizeChecked(false);
                    }}
                    style={{
                      fontWeight: "400",
                      border: "3px solid var(--dark-green)",
                    }}
                  >
                    Reset Filters
                  </Button>
                </Stack>
              </div>
              <div className="packets">
                {filteredPlants.map((plant, idx) => (
                  <div key={idx} className="plant">
                    <ItemCard plant={plant} addToGarden={addToGarden} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </ChakraProvider>
    </>
  );
}

export default App;
