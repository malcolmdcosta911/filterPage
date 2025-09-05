export const getPriceSearchParams = () => {
  const paramsStringArr = new URLSearchParams(document.location.search).getAll(
    "size"
  );
  const paramsNumberArr = paramsStringArr.map((param) => Number(param));
  return paramsNumberArr || [];
};

export const getQuerySearchParam = () => {
  return new URLSearchParams(document.location.search).get("q") || "";
};
