import "./Pricing.css";
// import ReactRangeSliderInput, {
//   type InputEvent,
// } from "react-range-slider-input";
import { PricingOption } from "../models/Product";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPriceSearchParams, getQuerySearchParam } from "../utils/helper";

const Pricing = () => {
  // const [priceRange, setPriceRange] = useState<InputEvent>([0, 999]);

  //pricing
  const [pricing, setPricing] = useState<PricingOption[]>(getPriceSearchParams);

  const [, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // const value = e.target.value;
    if (e.target.checked) {
      handlePricingChange([...pricing, value as PricingOption]);
    } else {
      handlePricingChange(
        pricing.filter((val: PricingOption) => val != (value as PricingOption))
      );
    }
  };

  const handlePricingChange = (val: PricingOption[]) => {
    // setPageNo(1);
    setPricing(val);
    const query = getQuerySearchParam();

    if (val.length == 0) {
      setSearchParams((searchParams) => {
        searchParams.delete("size");
        return searchParams;
      });
    } else {
      setSearchParams({
        size: val.map((v: PricingOption) => String(v)),
        ...(query ? { q: query } : {}),
      });
    }
  };

  return (
    <div className="pricing">
      {/* pricing options */}
      <div className="pricing__options">
        <div className="heading">Pricing option</div>
        {[
          { id: "Small", value: PricingOption.SMALL, labeled: "Small" },
          { id: "Medium", value: PricingOption.MEDIUM, labeled: "Medium" },
          {
            id: "Large",
            value: PricingOption.LARGE,
            labeled: "Large",
          },
        ].map(({ id, value, labeled }) => (
          <label key={id} htmlFor={id} className="pricing-labels">
            <input
              type="checkbox"
              name={id}
              id={id}
              checked={pricing.includes(value)}
              value={value}
              onChange={handleChange}
            />
            {labeled}
          </label>
        ))}
        {/* {pricing.includes(PricingOption.PAID) ? (
          <div className="range-slider-container">
            <div className="slider-values">${priceRange[0]}</div>
            <ReactRangeSliderInput
              min={0}
              max={999}
              step={1}
              defaultValue={[0, 999]}
              onInput={(e) => setPriceRange(e)}
            />
            <div className="slider-values">${priceRange[1]}</div>
          </div>
        ) : null} */}
      </div>
      {/* pricing reset */}
      <div>
        <button
          onClick={() => handlePricingChange([])}
          className="reset-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pricing;
