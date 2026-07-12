const Settings = ({ data, setData }) => {
  const { theme } = data;
  function handleChange(e) {
    setData((prev) => ({ ...prev, theme: e.target.name }));
  }
  return (
    <div>
      <div>
        <input
          type="radio"
          name="dark"
          id="theme"
          checked={theme === "dark"}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="dark">Dark</label>
      </div>
      <div>
        <input
          type="radio"
          name="light"
          id="theme"
          checked={theme === "light"}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="light">Light</label>
      </div>
    </div>
  );
};

export default Settings;
