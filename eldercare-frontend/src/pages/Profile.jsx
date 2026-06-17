import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dashboardStyles } from "../styles";

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
    <div className={dashboardStyles.layout}>

      {/* SIDEBAR */}
      <div className={dashboardStyles.sidebar}>
        <h2 className={dashboardStyles.brand}>Nest Life:CURA</h2>

        <ul className={dashboardStyles.navList}>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/book-service")}>Book Service</li>
          {/* <li>Search Caretakers</li> */}
          <li className={dashboardStyles.navItem} onClick={() => navigate("/complaints")}>Complaints</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/emergency")}>Emergency</li>
          <li className={dashboardStyles.activeNavItem}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className={dashboardStyles.main}>

        <h1 className={dashboardStyles.pageTitle}>Profile</h1>

        <div className={dashboardStyles.grid}>

          {/* LEFT COLUMN */}
          <div className={dashboardStyles.left}>

            {/* BASIC DETAILS */}
            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Basic Details</h3>

              <input
                name="name"
                placeholder="Full Name"
                value={user.name || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />

              <input
                name="email"
                value={user.email || ""}
                disabled
                className={dashboardStyles.input}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={user.phone || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />

              <input
                name="job"
                placeholder="Job Profile"
                value={user.job || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />
            </div>

            {/* ADDRESS */}
            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Address Details</h3>

              <input
                name="address"
                placeholder="Child Address"
                value={user.address || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />

              <input
                name="parentAddress"
                placeholder="Parent Address"
                value={user.parentAddress || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />

              <input
                name="city"
                placeholder="City"
                value={user.city || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className={dashboardStyles.right}>

            {/* EXTRA INFO */}
            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Additional Info</h3>

              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                value={user.emergencyContact || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />

              <textarea
                name="notes"
                placeholder="Special Needs / Notes"
                value={user.notes || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={dashboardStyles.input}
              />
            </div>

            {/* ACTIONS */}
            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Actions</h3>

              {editMode ? (
                <>
                  <button className={dashboardStyles.saveButton} onClick={handleUpdate}>
                    Save
                  </button>
                  <button
                    className={dashboardStyles.cancelButton}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className={dashboardStyles.editButton}
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
