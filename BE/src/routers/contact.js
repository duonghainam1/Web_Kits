import { Router } from "express";
import {
  create_contact,
  delete_contact,
  get_contact,
  getById_contact,
  update,
  getContactByNameOrEmail,
} from "../controllers/contact/contact";
import { checkRole } from "../controllers/Auth/auth";

const Router_Contact = Router();

// Định nghĩa các route và gán controller tương ứng
Router_Contact.post("/contact", create_contact);
Router_Contact.get("/contact", checkRole(["admin"]), get_contact);
Router_Contact.get("/contact/:id", checkRole(["admin"]), getById_contact);
Router_Contact.delete("/contact/:id", delete_contact);
Router_Contact.put("/contact/feedback/:id", checkRole(["admin"]), update);
Router_Contact.post("/contacts/search", getContactByNameOrEmail);

export default Router_Contact;
