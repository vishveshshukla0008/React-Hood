import React from "react";

const Interest = ({ data, setData, errors }) => {
  const { interests } = data;
  function handleChange(e) {
    setData((prev) => ({
      ...prev,
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((i) => i !== e.target.name),
    }));
  }

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            handleChange(e, "coding");
          }}
          type="checkbox"
          name="coding"
          id="coding"
          checked={interests.includes("coding")}
        />
        <label htmlFor="coding">Coding</label>
      </div>
      <div>
        <input
          onChange={(e) => {
            handleChange(e, "music");
          }}
          type="checkbox"
          name="music"
          id="music"
          checked={interests.includes("music")}
        />
        <label htmlFor="music">Music</label>
      </div>
      <div>
        <input
          onChange={(e) => {
            handleChange(e, "gaming");
          }}
          type="checkbox"
          name="gaming"
          id="gaming"
          checked={interests.includes("gaming")}
        />
        <label htmlFor="gaming">Gaming</label>
      </div>
      <div>
        <input
          onChange={(e) => {
            handleChange(e, "javascript");
          }}
          type="checkbox"
          name="javascript"
          id="javascript"
          checked={interests.includes("javascript")}
        />
        <label htmlFor="javascript">Javascript</label>
      </div>
      <div>
        <input
          onChange={(e) => {
            handleChange(e, "reactJS");
          }}
          type="checkbox"
          name="reactJS"
          id="React JS"
          checked={interests.includes("reactJS")}
        />
        <label htmlFor="React JS">React JS</label>
      </div>
      {errors?.interests && <span className="text-red-600">{errors.interests}</span>}
    </div>
  );
};

export default Interest;
