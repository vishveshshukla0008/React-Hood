const Profile = ({ data, setData, errors }) => {
  const { name, email, profile, age } = data;
  const handleChange = (e, item) => {
    setData((prev) => ({ ...prev, [item]: e.target.value }));
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          value={name}
          className="mt-2 border-none bg-black/10 p-3 rounded-sm"
          type="text"
          placeholder="what's your name"
          id="name"
          onChange={(e) => handleChange(e, "name")}
        />
        {errors?.name && <span className="text-red-800">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <br />
        <input
          value={age}
          className="mt-2 border-none bg-black/10 p-3 rounded-sm"
          type="number"
          placeholder="what's your age"
          id="age"
          onChange={(e) => handleChange(e, "age")}
        />
        {errors?.age && <span className="text-red-800">{errors.age}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          value={email}
          className="mt-2 border-none bg-black/10 p-3 rounded-sm"
          type="email"
          placeholder="what's your email"
          id="email"
          onChange={(e) => handleChange(e, "email")}
        />
        {errors?.email && <span className="text-red-800">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="profile">Profile URL:</label>
        <br />
        <input
          value={profile}
          className="mt-2 border-none bg-black/10 p-3 rounded-sm"
          type="text"
          placeholder="profile url"
          id="profile"
          onChange={(e) => handleChange(e, "profile")}
        />
        {errors?.profile && (
          <span className="text-red-800">{errors.profile}</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
