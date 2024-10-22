import axios from "axios";
const base = "http://localhost:8080";

export async function getData(path) {
  try {
    const res = await axios.get(base + path);

    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function postData(path, data) {
  try {
    const res = await axios.post(base + path, data);

    if (res.status === 201) {
      return res;
    }
    throw new Error(res.status);
  } catch (e) {
    console.log(e);
  }
}

export async function patchData(path, data) {
  try {
    const res = await axios.patch(base + path, data);

    return res;
  } catch (e) {
    console.log(e);
  }
}
export async function deleteData(path, data) {
  try {
    const res = await axios.delete(base + path, {
      data: data,
    });

    if (res.status === 200) {
      return res;
    }
    throw new Error(res.status);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
