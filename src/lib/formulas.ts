import { DateTime } from "luxon";

export const depreciationPerAnnum = (cost, value, usefulLife) => {
  const result = (cost - value) / usefulLife;

  return Math.round((result + Number.EPSILON) * 100) / 100; //Ensures rounding of 23.333333333333332 to 23.33
};

export const depreciation = (cost, value, usefulLife, purchaseDate) => {
  const result =
    depreciationPerAnnum(cost, value, usefulLife) * yearsBetween(purchaseDate);
  return Math.round((result + Number.EPSILON) * 100) / 100; //Ensures rounding of 23.333333333333332 to 23.33
};

export const yearsBetween = (purchaseDate) => {
  let now = DateTime.now();
  let end = DateTime.fromISO(purchaseDate);

  return now.year - end.year;
};
