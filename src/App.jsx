import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
let API_key = "&apikey=57ff83c2";
let base_url = "http://www.omdbapi.com";
let url = base_url + `/?s=batman&page=1` + API_key;

function App() {
  const [datas, setDatas] = useState([]);
  const [records, setRecords] = useState("");
  const [url_set, setUrl_set] = useState(url);
  const [searchMovie, setSetsearchMovie] = useState("don");

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?s=don&page=1&apikey=57ff83c2`)
      .then((res) => {
        console.log(res);

        setDatas(res.data.Search);
      });
  }, []);

  const getMovie = () => {
    axios
      .get(`http://www.omdbapi.com/?s=${searchMovie}&page=1&apikey=57ff83c2`)
      .then((res) => {
        setDatas(res.data.Search);
      });
  };

  const handleAscending = () => {
    const initialData = datas.map((data) => data);
    const sorting = [...initialData].sort((a, b) =>
      a.Year.localeCompare(b.Year)
    );
    setDatas(sorting);
  };

  return (
    <>
      <h1 className="text-blue-800 text-3xl font-bold mb-6 underline">
        Movie Database
      </h1>
      <input
        className="border-blue-800 border rounded-2xl px-2 py-2 mb-5 mr-3 w-2/4"
        type="text"
        placeholder="Filter"
        value={searchMovie}
        onChange={(e) => setSetsearchMovie(e.target.value)}
      />
      <button
        onClick={getMovie}
        className="bg-blue-800 text-blue-200 px-4 py-2 rounded-3xl"
      >
        Search
      </button>

      <button
        className="bg-blue-800 text-blue-200 py-2 px-4 rounded-3xl ml-2"
        onClick={() => handleAscending()}
      >
        A-Z
      </button>
      <ul className="text-3xl font-bold grid grid-cols-4 gap-5	">
        {datas
          .filter((val) => {
            if (records === "") {
              return val;
            } else if (
              val.Title.toLowerCase().includes(records.toLocaleLowerCase()) ||
              val.Year.toLowerCase().includes(records.toLocaleLowerCase())
            ) {
              return val;
            }
            if (val.Title.toLowerCase().includes(records.toLocaleLowerCase())) {
              return val;
            }
          })
          .map((e, index) => {
            const oddNumber = index % 2 !== 0;
            return (
              <li
                className={`${
                  oddNumber ? "bg-blue-800" : "bg-slate-600"
                }   shadow-lg p-3 text-left `}
                key={e.imdbID}
              >
                <div>
                  <img
                    src={e.Poster}
                    className="object-fill h-[50vh] w-full"
                    alt={e.Title}
                  />
                  <h3
                    className={`${
                      oddNumber ? "text-blue-300" : "text-slate-200"
                    } text-lg `}
                  >
                    {e.Title}
                  </h3>
                  <p
                    className={`text-sm ${
                      oddNumber ? "text-blue-300" : "text-slate-200"
                    }`}
                  >
                    Year:{" "}
                    <span
                      className={`${
                        oddNumber ? "text-blue-300" : "text-slate-200"
                      }`}
                    >
                      {e.Year}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default App;
