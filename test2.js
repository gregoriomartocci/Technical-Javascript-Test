const formatString = (str, actual, n) => {
  let new_str = str?.split("-"); // obtengo el array
  // console.log(new_str[actual] === "3t", "TODO PELOTA");

  if (actual === new_str?.length - 1) {
    // si actual es el ultimo
    return new_str;
  } else {
    if (new_str) {
    }

    if (actual === 1 && new_str[actual - 1]?.length < n - 1) {
      // si estoy en el primer paso y el de la izq puede recibir?

      const first_digit = new_str[actual]?.slice(0, 1);
      new_str[actual - 1] = new_str[actual - 1]?.concat(first_digit);
      new_str[actual] = new_str[actual]?.slice(1);

      const str = new_str?.join("-");
      new_str = formatString(str, actual, n);

      // el grupo tiene la cantidad n
    }

    if (new_str[actual]?.length === n) {
      const str = new_str.join("-");
      new_str = formatString(str, actual + 1, n);
    }

    // grupo acutal es menor a N
    console.log(new_str[actual], "RIQUELME");

    if (new_str[actual]?.length < n) {
      if (new_str[actual + 1]?.length >= 1) {
        // le puedo sacar a mi compa de la derecha?

        // if (new_str[actual + 1]?.length === 1) {
        //   new_str = formatString(str, actual, n);
        // }

        if (new_str[actual + 1]?.length === 1) {
          const first_digit = new_str[actual + 1]?.slice(0, 1);
          new_str[actual] = new_str[actual]?.concat(first_digit); // modifico el arreglo
          new_str[actual + 1] = new_str[actual + 2];
          new_str.pop();
          const str = new_str.join("-");
          new_str = formatString(str, actual, n);
        } else {
          const first_digit = new_str[actual + 1]?.slice(0, 1);
          new_str[actual] = new_str[actual]?.concat(first_digit); // modifico el arreglo
          new_str[actual + 1] = new_str[actual + 1]?.slice(1);

          const str = new_str.join("-");
          new_str = formatString(str, actual, n);
        }
      } else {
        return new_str;
      }

      const str = new_str.join("-");
      new_str = formatString(str, actual, n);
    }

    // grupo actual es mayor a N

    if (new_str[actual]?.length > n) {
      //al grupo actual le sobran digitos

      if (new_str[actual - 1].length >= n) {
        // si mi compa de la izq tiene length n o mayor me salgo
        return new_str;
      } else {
        const first_digit = new_str[actual].slice(0, 1);
        new_str[actual - 1] = new_str[actual - 1].concat(first_digit);
        new_str[actual] = new_str[actual].slice(1);

        const str = new_str.join("-");

        new_str = formatString(str, actual, n);
      }
    }
  }

  return new_str;
};

const formatted = (id, n) => {
  let array = formatString(id, 1, n);
  return array;
};

const result1 = formatted("3h5n-8v-7-m", 4); // "3h5n-8v7m"
const result2 = formatted("4-3t-0-u", 2); // "4-3t-0u"
const result3 = formatted("j-45i9ut5-34f-x10", 5); // "j45i-9ut53-4fx10"

console.log(result1, "Okkk");
console.log(result2, "Okkk");
console.log(result3, "Okkk");

// assert(formatted("3h5n-8v-7-m", 4) === "3h5n-8v7m")
// assert(formatted("4-3t-0-u", 2) === "4-3t-0u")
// assert(formatted("j-45i9ut5-34f-x10", 5) === "j45i-9ut53-4fx10")
