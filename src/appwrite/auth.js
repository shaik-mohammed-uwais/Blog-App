import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        return this.login({ email, password });
      } else {
        return useraccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const user = await this.getCurrentuser();
      if (user) {
        console.log("User is already logged in:");
        return user;
      }

      await this.account.createEmailPasswordSession(email, password);
      const userdata = await this.getCurrentuser();
      return userdata;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authservices = new Authservices();
export default authservices;
