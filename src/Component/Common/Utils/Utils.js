export const calculateInventoryValues = (props) => {
  const { apiData } = props;

  if (apiData?.length > 0) {
    let totalValue = 0;
    const uniqueCategories = {};
    let outOfStockItems = 0;

    const updatedApiData = apiData.map((item) => ({
      ...item,
      isDisabled: false,
    }));

    updatedApiData.forEach((item) => {
      totalValue += parseFloat(item?.value.replace("$", ""));
      uniqueCategories[item.category] = true;

      if (item.quantity === 0) {
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
