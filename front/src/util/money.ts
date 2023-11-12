export const extractDollars = (value: number): string => {
    if (!isNaN(value)) {
      if (value >= 0) {
        return `+$${value.toFixed(0)}`;
      } else {
        return `-$${Math.abs(value).toFixed(0)}`;
      }
    } else {
      throw new Error("Invalid input");
    }
  };
  
  //центы
  
  export const extractCents = (value: number): string => {
    if (!isNaN(value)) {
      return `.${value.toFixed(2).split(".")[1]}`;
    } else {
      throw new Error("Invalid input");
    }
  };
