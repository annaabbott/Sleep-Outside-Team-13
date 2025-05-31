import { convertToJson } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;


export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const jsonResponse  = await convertToJson(response);
    return jsonResponse;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const jsonResponse  = await convertToJson(response);

    console.log(jsonResponse);
    return jsonResponse;
  }
}

