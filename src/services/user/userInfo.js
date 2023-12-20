import { authToken } from "../../../storage/storage"

export const getProfileInfo =  async (setProfileData) => {
    const request = await fetch("http://localhost:5000/user/profile", {
        method: "GET",
        headers: {
            "Authorization": authToken
        }
    })

    const data = request.json();

    setProfileData(data);

    console.log(data);
}