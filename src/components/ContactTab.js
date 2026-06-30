import React from "react";
import { Link } from "react-router-dom";
import "./ContactTab.css";

function ContactTab() {
  return (
    <Link to="/contact" className="contact-tab">
      CUSTOMER CARE
    </Link>
  );
}

export default ContactTab;