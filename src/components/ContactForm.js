import { useState, useContext } from "react";
import "../styles/contactForm.css";
import { StoreContext } from "..";
import {
  addContactOrGroupToList,
  showContactForm,
  updateContactGroupId,
  addCurrentContactOrGroup,
  addChatsListToList,
  addCurrentChatsList,
} from "../actions/index";

const ContactForm = ({ dispatch, contactOrGroupId, setShowContactForm }) => {
  const [contactName, setContactName] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const addContactsInList = () => {
    const initialContact = {
      isGroup: false,
      contactOrGroupId: contactOrGroupId + 1,
      contactOrGroupName: contactName,
      mobileNumber: mobileNum,
      profilePict: selectedProfile || require("../assets/myPhoto.jpg"),
      lastChat: {
        text: "",
        date: "",
        time: "",
      },
      group: null,
    };

    const initialChatList = {
      contactOrGroupId: contactOrGroupId + 1,
      chatsLists: [],
    };

    dispatch(addContactOrGroupToList(initialContact));
    dispatch(addCurrentContactOrGroup(initialContact));
    dispatch(addChatsListToList(initialChatList));
    dispatch(addCurrentChatsList([]));
    dispatch(updateContactGroupId(contactOrGroupId + 1));
    dispatch(showContactForm(!setShowContactForm));
  };

  const selectProfilePic = (e) => {
    setSelectedProfile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="ContactForm">
      <span className="contactFormHeader"> Add Contact</span>

      <div className="profilePicker">
        {selectedProfile !== "" ? (
          <img className="ProfileImg" src={selectedProfile} alt="" />
        ) : (
          <div>
            <label htmlFor="profileSelector" className="selectProfileLabel">
              +
            </label>
            <input
              id="profileSelector"
              type="file"
              onChange={selectProfilePic}
            />
          </div>
        )}
      </div>

      {selectedProfile !== "" && (
        <div className="anotherProfilePicker">
          <label htmlFor="anotherProfileSelector">Select Another Pic</label>
          <input
            id="anotherProfileSelector"
            type="file"
            onChange={selectProfilePic}
          />
        </div>
      )}

      <div className="field">
        <input
          placeholder="Enter Name"
          type="text"
          required
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
      </div>

      <div className="field">
        <input
          placeholder="Enter MobileNum"
          type="number"
          value={mobileNum}
          onChange={(e) => setMobileNum(e.target.value)}
        />
      </div>

      <div className="field">
        <button id="add_contact_btn" onClick={addContactsInList}>
          Add
        </button>
      </div>
    </div>
  );
};

const ContactFormWrapper = ({ setShowContactForm }) => {
  const { store } = useContext(StoreContext);
  const { dispatch } = store;
  const contactOrGroupId = store.getState().contactOrGroupId;

  return (
    <ContactForm
      dispatch={dispatch}
      contactOrGroupId={contactOrGroupId}
      setShowContactForm={setShowContactForm}
    />
  );
};

export default ContactFormWrapper;
