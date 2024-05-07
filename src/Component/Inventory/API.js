import axios from "axios";

const APIEndPoints = {
  INVENTORY_DATA: "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory",
};

export async function fetchInventoryData() {
  try {
    const response = await axios.get(APIEndPoints?.INVENTORY_DATA);
    const values = response.data;
    return values;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
