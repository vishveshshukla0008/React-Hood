import React, { useEffect, useState } from "react";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  async function fetchData() {
    try {
      if (cache[search]) {
        console.log("Returned by Cache !");
        setRecipes(cache[search]);
        return;
      }
      const data = await fetch(
        "https://dummyjson.com/recipes/search?q=" + search,
      );
      console.log("API-call");
      const result = await data.json();
      setRecipes(result?.recipes);
      setCache((prev) => ({ ...prev, [search]: result?.recipes }));
    } catch (error) {
      // alert("API fetch error !");
      console.log(error);
    }
  }

  // function throttle(fn, delay) {
  //   let lastCall = 0; // check for last call !
  //   return function (...args) {
  //     const now = Date.now(); // find current date !
  //     if (now - lastCall < delay) {
  //       return;
  //     }
  //     lastCall = now;
  //     return fn(...args);
  //   };
  // }

  useEffect(() => {
    let timer = setTimeout(fetchData, 1000);
    return () => {
      console.log("UseEffect dobara bana");
      clearTimeout(timer);
    };
  }, [search]);

  // function debounce(fn, delay) {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   };
  // }

  return (
    <div className="h-screen p-10 w-full bg-slate-950 text-white flex flex-col items-center gap-3">
      <div className="">
        <input
          className="placeholder:text-white/50 w-80 p-4 border border-white rounded-md"
          type="text"
          name="search"
          placeholder="search here"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>
      {showResults && (
        <div className="max-h-200 border p-5  flex flex-col text-left  overflow-scroll scrollbar-none">
          {recipes.map((el) => (
            <span key={el.id} className="cursor-pointer hover:bg-slate-700 p-1">
              {el.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
