export const calculateInventoryValues = (props) => {
  const { apiData } = props;

  if (apiData?.length > 0) {
    let totalValue = 0;
    const uniqueCategories = {};
    let outOfStockItems = 0;

    const updatedApiData = apiData.map((item) => ({
      ...item,
      isDisabled: item?.isDisabled || false,
      value: item?.value?.includes("$")
        ? item?.value?.split("$")?.[1]
        : item?.value,
      price: item?.price?.includes("$")
        ? item?.price?.split("$")?.[1]
        : item?.price,
    }));

    updatedApiData.forEach((item) => {
      totalValue += parseFloat(item?.value.replace("$", ""));
      uniqueCategories[item.category] = true;

      if (item.quantity == 0) {
        outOfStockItems++;
      }
    });

    const noOfCategories = Object.keys(uniqueCategories).length;

    return {
      totalValue,
      noOfCategories,
      outOfStockItems,
      apiData: updatedApiData,
    };
  } else {
    return [];
  }
};
