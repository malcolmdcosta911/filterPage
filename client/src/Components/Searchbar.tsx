import "./Searchbar.css";
import { useState } from "react";
import { CircleX, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getQuerySearchParam } from "../utils/helper";

//doesnt use debounce
//only passes state on final submit/reset
const Searchbar = () => {
  const [keyword, setKeyWord] = useState(getQuerySearchParam);

  const [allowReset, setAllowReset] = useState(() => {
    return getQuerySearchParam() ? true : false;
  });

  const [, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    setAllowReset(true);
    handleKeyWord(keyword);
  };

  const handleReset = () => {
    setAllowReset(false);
    setKeyWord("");
    handleKeyWord("");
  };

  const handleKeyWord = (word: string) => {
    // setPageNo(1);

    if (!word) {
      setSearchParams((searchParams) => {
        searchParams.delete("q");
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.set("q", word);
        return searchParams;
      });
    }
  };

  return (
    <div>
      <form
        className="searchbar"
        aria-label="searchbar"
        role="searchbox"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Find items your looking for"
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
        />

        {allowReset === false ? (
          <button type="submit" aria-label="submit">
            <Search />
          </button>
        ) : (
          <button type="reset" aria-label="reset" onClick={handleReset}>
            <CircleX />
          </button>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
