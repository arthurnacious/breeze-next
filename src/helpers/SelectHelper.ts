export const SelectDataConverter: (data, dataName) => object[] = (
  data,
  dataName: string
) => {
  let array = [];

  if (typeof data != "undefined") {
    data.map((row) => {
      array.push({ value: row.id, label: row[dataName] });
    });
  }

  return array;
};
