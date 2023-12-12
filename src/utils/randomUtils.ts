const randomIntFromRange = (min: number, max: number): number => {
    const minNorm = Math.ceil(min);
    const maxNorm = Math.floor(max);
    const idx = Math.floor(Math.random() * (maxNorm - minNorm + 1) + minNorm);
    return idx;
  };
  
  export { randomIntFromRange };
  