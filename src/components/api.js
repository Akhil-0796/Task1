const baseURL = "https://reqres.in/api/users?page=2";

export const getUserList = async () => {
  try {
    const res = await fetch(`${baseURL}`);
    if (!res.ok) {
    console.error("failed", res.status);
      return;
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("error : ", error);
  }
};