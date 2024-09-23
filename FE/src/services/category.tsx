import { ICategory } from "../common/interfaces/Category";
import instance from "../configs/axios";

export const getAll = async () => {
  try {
    const { data } = await instance.get(`/category`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getById = async (id: string) => {
  try {
    const { data } = await instance.get(`/category/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createCategories = async (category: ICategory) => {
  try {
    const { data } = await instance.post("/category", category);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (category: ICategory) => {
  try {
    const { data } = await instance.delete(`/category/${category._id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (category: ICategory) => {
  try {
    const { data } = await instance.put(`/category/${category._id}`, category);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
