// Javascript
// General Hints

// For all exercises, please prefer readability/expressiveness over maximum algorithmic
// efficiency.

// Use the DRY method, and good code practices improve your final test score.

// - You must use explanatory names for your variables.

// - Use ES6 syntax.

// It is preferable that you use javascript's standard built-in objects.

// Example:
// Array, Map, Math.

// You may add any other code such as functions, data structures, etc. that you may want
// // in order to better complete an exercise, beyond what is explicitly asked for. Feel free to
// reuse code for multiple exercises as well.

// Exercises

// 1 - Create a function that takes an array of integers as its lone argument and returns
// an array containing the square of each value in the input.
// For example, an input of `[2, 4, 6, 8, 10]` should result in an output of `[4, 16, 36,
// 64, 100]`.
// For Testing:
// console.log(calculateSquare([2, 4, 6, 8, 10]));

const calculateSquare = (array) => {
  const newArray = array.map((element) => Math.pow(element, 2));
  return newArray;
};

const array = [0, 2, 5, 6, 8];

console.log(calculateSquare(array));

// 2 - Create a function that takes an array of counter objects (see example) as its lone
// argument and returns the sum of all of the counters' `count` properties.
// For example, an input of `[{count: 1}, {count: 2}, {count: 3}]` should result in an
// output of `6`.
// For Testing:
// console.log(sumCounters([{count: 1}, {count: 2}, {count: 3}]));

const sum = (array) => {
  const newArray = array.reduce((total, item) => {
    return total + item.count;
  }, 0);

  return newArray;
};

const array2 = [{ count: 1 }, { count: 2 }, { count: 3 }, { count: 4 }];

console.log(sum(array2));

// 3 - Create a function that takes an object in the general shape of `movies` (see below)
// as the first argument,and the name of an actor as the second argument. The function
// should return an object that is equivalent to
// the input, only with the given actor's name included in each movie's `actors` array. If
// the name is already present, it should not be added again. The function should not
// mutate the input object, or any of its sub-structures.
// Note: `movies` is just an example, the function should not assume that the movies in
// the object will be hard-coded.
// For Testing:
// console.log(actorInMovies(movies, "Tom Cruise"));


const movies = {
  big: {
    actors: ["Elizabeth Perkins", "Robert Loggia"],
  },
  "forrest gump": {
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
  },
  "cast away": {
    actors: ["Helen Hunt", "Paul Sanchez"],
  },
};

const moviesAreValid = (movies, name) => {
  const moviesObject = movies;

  for (var key in moviesObject) {
    if (!moviesObject[key]["actors"].includes(name)) {
      moviesObject[key]["actors"] = [...moviesObject[key]["actors"], name];
    }
  }

  return moviesObject;
};

moviesAreValid(movies, "Tom Hanks");


// 4 - Create a procedure that takes an object in the general shape of `movies` as its lone
// argument and appends an unordered list of every actor's name to the DOM's `body`
// element.
// The names in the list should be unique (no actor's name should appear in the list more
// than once).
// If the list element already exists in the DOM, the procedure should replace the existing
// list with a new one.
// Bonus points if the names are alphabetically sorted :)
// For Testing:
// listActors(movies);

const a1 = {
  value: 1,
  left: { value: 2 },
};
const b1 = {
  value: 1,
  right: { value: 2 },
};

// output = false

const a2 = {
  value: 1,
  left: { value: 2 },
  right: { value: 3 },
};
const b2 = {
  value: 1,
  left: { value: 2 },
  right: {
    value: 3,
    left: { value: 4 },
  },
};

// output = true

const readTree = (root) => {
  if ((root === null) | (root === undefined)) {
    return [];
  }

  const result = [];

  if ((root?.left === null) | (root?.left === undefined)) {
    result.push(...readTree(root?.left));
  }

  result.push(root?.value);

  if ((root?.right !== null) | (root?.right === undefined)) {
    result.push(...readTree(root?.left));
  }

  return result;
};

const compareArrays = (array1, array2) => {
  if (!array2) return false;

  if (array1.length != array2.length) return false;

  for (let i = 0, l = array1.length; i < l; i++) {
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      if (!array1[i].compareArrays(array[i])) return false;
    } else if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
};

const treesAreEqual = (tree1, tree2) => {
  const treeA = readTree(tree1);
  const treeB = readTree(tree2);

  const result = compareArrays(treeA, treeB);
  console.log("ARBOL A", treeA, "ARBOL B", treeB);
  console.log(result)
  return result;
};

treesAreEqual(a1, b1);
treesAreEqual(a2, b2);

// 5A - Create a procedure that retrieves the data from the REST API endpoint hosted here:
// https://jsonplaceholder.typicode.com/posts.
// The procedure should then log the id of the first post with a userId of 7 and a title that
// begins with the letter "e" or undefined if it does not exist. It should also log any
// potential retrieval errors using `console.error`.

// const getData = async (url) => {
//   const data = fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
//   console.log(data, "Okkk");
// };

const https = require("https");

const getData = async (url) => {
  return https
    .get(url, (res) => {
      let data = "";

      res.on("data", (response) => {
        data += response;
      });

      res.on("end", () => {
        data = JSON.parse(data);

        const response = data;

        const find = response.find(
          ({ userId, title }) => userId === 7 && title.substring(0, 1) === "e"
        );

        console.log(find, "OKK");

        if (find) return find;

        const message =
          "Could not find an User Id with 7 digits and the first letter starting with e";
        console.log(message);

        // if we wanna drop an error with status code simulating the bad request
        // throw new Error(message, { statusCode: 404 });
      });
    })

    .on("error", (err) => {
      console.log(err.message);
    });
};

const url = "https://jsonplaceholder.typicode.com/posts";

getData(url);


// 5B - Given a string containing alphanumeric characters and dashes `str`, and an integer
// representing group size `n`, return a newly formatted version of `str` in which the
// alphanumeric characters are grouped according to `n`, and separated by dashes. Each
// group should contain exactly `n` characters except for the first one, which may contain
// less than `n` characters to account for any remainder.


const formatString = (str, actual, n) => {
  let new_str = str?.split("-"); // obtengo el array

  if (actual === new_str?.length - 1) {
    // si actual es el ultimo
    return new_str;
  } else {
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
      const str = new_str?.join("-");
      new_str = formatString(str, actual + 1, n);
    }

    // grupo acutal es menor a N

    if (new_str[actual]?.length < n) {
      if (new_str[actual + 1]?.length >= 1) {
        // le puedo sacar a mi compa de la derecha?

        if (new_str[actual + 1]?.length === 1) {
          const first_digit = new_str[actual + 1]?.slice(0, 1);
          new_str[actual] = new_str[actual]?.concat(first_digit); // modifico el arreglo
          new_str[actual + 1] = new_str[actual + 2];
          new_str.pop();
          const str = new_str?.join("-");
          new_str = formatString(str, actual, n);
        } else {
          const first_digit = new_str[actual + 1]?.slice(0, 1);
          new_str[actual] = new_str[actual]?.concat(first_digit); // modifico el arreglo
          new_str[actual + 1] = new_str[actual + 1]?.slice(1);

          const str = new_str?.join("-");
          new_str = formatString(str, actual, n);
        }
      } else {
        return new_str;
      }

      const str = new_str?.join("-");
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

        const str = new_str?.join("-");

        new_str = formatString(str, actual, n);
      }
    }
  }

  return new_str;
};

const formatted = (id, n) => formatString(id, 1, n);

const result1 = formatted("3h5n-8v-7-m", 4); // "3h5n-8v7m"
const result2 = formatted("4-3t-0-u", 2); // "4-3t-0u"
const result3 = formatted("j-45i9ut5-34f-x10", 5); // "j45i-9ut53-4fx10"

console.log(result1);
console.log(result2);
console.log(result3);



// assert(arrEq(squares([2, 4, 6, 8, 10]), [4, 16, 36, 64, 100]))
// assert(arrEq(squares([17, 9, 186]), [289, 81, 34596]))
// assert(sum([{count: 1}, {count: 2}, {count: 3}]) === 6)
// assert(sum([{count: 95}, {count: 8}, {count: 23}, {count: 51}]) === 177)
// assert(moviesAreValid(moviesWithActor(movies1, 'Tom Hanks'), 'Tom Hanks'))
// assert(moviesAreValid(moviesWithActor(movies2, 'Matt Damon'), 'Matt Damon'))
// assert(treesAreEqual(trees1[0], trees1[1]) === true)
// assert(treesAreEqual(trees2[0], trees2[1]) === false)
// assert(treesAreEqual(trees3[0], trees3[1]) === false)
// assert(treesAreEqual(trees4[0], trees4[1]) === false)
// assert(treesAreEqual(trees5[0], trees5[1]) === true)
// assert(formatted("3h5n-8v-7-m", 4) === "3h5n-8v7m")
// assert(formatted("4-3t-0-u", 2) === "4-3t-0u")
// assert(formatted("j-45i9ut5-34f-x10", 5) === "j45i-9ut53-4fx10")
// console.log('passed')
// }
