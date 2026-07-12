import { useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState();
  const [data, setData] = useState({
    name: "Vishwesh",
    email: "vish@vesh.com",
    profile: "bjdsbkdjsf.com",
    age: 12,
    interests: ["music", "coding", "gaming"],
    theme: "dark",
  });
  const tabs = [
    {
      name: "Profile",
      compoent: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name < 2) {
          err.name = "Name is not valid";
        }
        if (!data.age || data.age <= 7) {
          err.age = "Age must be greater than or equal to 8";
        }
        if (!data.email) {
          err.email = "Email is not valid!";
        }
        if (!data.profile) {
          err.profile = "Profile is not valid";
        }

        setErrors(err);
        return err.name || err.email || err.age || err.profile ? false : true;
      },
    },
    {
      name: "Interests",
      compoent: Interest,
      validate: () => {
        const err = {};
        if (data.interests.length === 0) {
          err.interests = "select at least one interest !";
        }
        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: "Settings",
      compoent: Settings,
      validate: () => {
        return errors;
      },
    },
  ];

  const ActiveTabComponent = tabs[activeTab].compoent;

  function handleSubmitClick() {
    if (tabs[activeTab].validate()) {
      console.log(data);
    } else {
      alert("Could not submitted ! check required fields ");
    }
  }

  function handleNextTab() {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  }

  return (
    <div className="tabForm h-full w-full bg-slate-900 text-white p-25 rounded-xl">
      <div className="tabs flex items-center gap-3">
        {tabs.map((tab, index) => (
          <div
            key={tab.name}
            onClick={() => {
              if (tabs[activeTab].validate()) {
                setActiveTab(index);
              }
            }}
            className={`px-6 py-2 rounded-sm cursor-pointer font-medium ${activeTab == index ? "bg-green-600" : "bg-gray-700 "}`}>
            {tab.name}
          </div>
        ))}
      </div>
      <div className="container p-10 w-full h-full rounded-md">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      <div className="controls flex justify-center gap-5">
        <button
          disabled={activeTab == 0}
          onClick={() => setActiveTab((prev) => prev - 1)}
          className="bg-red-500 py-1 cursor-pointer disabled:cursor-not-allowed px-3 disabled:opacity-50 disabled:bg-slate-500">
          Prev
        </button>
        <button
          onClick={() => handleNextTab()}
          disabled={activeTab == tabs.length - 1}
          className="bg-green-500 cursor-pointer py-1 px-3 disabled:bg-slate-500 disabled:opacity-50  disabled:cursor-not-allowed ">
          Next
        </button>
        {activeTab === tabs.length - 1 && (
          <button
            onClick={handleSubmitClick}
            className="bg-green-500 cursor-pointer py-1 px-3 disabled:bg-slate-500">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
