import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `/api/users/${user._id}`,
        user
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile Updated ✅");
      setEditMode(false);

    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="brand">Nest Life:CURA</h2>

        <ul>
          <li onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/book-service")}>Book Service</li>
          {/* <li>Search Caretakers</li> */}
          <li onClick={() => navigate("/complaints")}>Complaints</li>
          <li onClick={() => navigate("/emergency")}>Emergency</li>
          <li className="active">Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="dashboard-main">

        <h1>Profile</h1>

        <div className="dashboard-grid">

          {/* LEFT COLUMN */}
          <div className="dashboard-left">

            {/* BASIC DETAILS */}
            <div className="card-box">
              <h3>Basic Details</h3>

              <input
                name="name"
                placeholder="Full Name"
                value={user.name || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />

              <input
                name="email"
                value={user.email || ""}
                disabled
                className="profile-input"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={user.phone || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />

              <input
                name="job"
                placeholder="Job Profile"
                value={user.job || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />
            </div>

            {/* ADDRESS */}
            <div className="card-box">
              <h3>Address Details</h3>

              <input
                name="address"
                placeholder="Child Address"
                value={user.address || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />

              <input
                name="parentAddress"
                placeholder="Parent Address"
                value={user.parentAddress || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />

              <input
                name="city"
                placeholder="City"
                value={user.city || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="dashboard-right">

            {/* EXTRA INFO */}
            <div className="card-box">
              <h3>Additional Info</h3>

              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                value={user.emergencyContact || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />

              <textarea
                name="notes"
                placeholder="Special Needs / Notes"
                value={user.notes || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="profile-input"
              />
            </div>

            {/* ACTIONS */}
            <div className="card-box">
              <h3>Actions</h3>

              {editMode ? (
                <>
                  <button className="btn-save" onClick={handleUpdate}>
                    Save
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn-edit"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;