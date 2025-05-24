import conf from "../conf/conf";
import { Client, Storage, ID, Databases, Query } from "appwrite";
export class Services {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createpost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          "featured-image": featuredImage,
          status,
          userid: userId,
        }
      );
      return post;
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage = null, status }) {
    try {
      const updateData = {
        title,
        content,
        status,
      };
      if (featuredImage) {
        updateData["featured-image"] = featuredImage;
      }
      return this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        updateData
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletepost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("errr occured while deleting", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      const post = await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log("error while getting post", error);
      return null;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("error while getting post", error);
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error while getting post", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error while getting post", error);
      return false;
    }
  }
  getfilepreview(fileId) {
    try {
      return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error getting file view:", error);
      return null;
    }
  }
}
const services = new Services();
export default services;
