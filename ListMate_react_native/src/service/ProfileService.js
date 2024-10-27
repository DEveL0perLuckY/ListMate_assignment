import { MYAXIOS } from "./Helper";
const Profile = async (token) => {
  try {
    const response = await MYAXIOS.get("/api/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default Profile;




// create first of all saprate function for this urls
1 getmapping {{URL1}}/api/products/getProduct
and this will return the list of products

[
  {
      "id": 10002,
      "name": "DemoProduct",
      "description": "A demo product for testing purposes",
      "price": "199.99",
      "category": "Electronics",
      "quantityInStock": 50,
      "createdAt": "2024-10-27T19:22:30.08",
      "updatedAt": "2024-10-27T19:22:30.08",
      "status": "Available",
      "discount": "15.00",
      "rating": "4.50"
  }   
] http status 200 OK

2 post mapping {{URL1}}/api/products
request body will accept
{
  "name": "DemoProduct",
  "description": "A demo product for testing purposes",
  "price": "199.99",
  "category": "Electronics",
  "quantityInStock": 50,
  "status": "Available",
  "discount": "15.00",
  "rating": "4.50"
}and this will return id 10002  
http status=> 201 Created

3 delete mapping {{URL1}}/api/products/:id


import { MYAXIOS } from "./Helper";
const -- = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await MYAXIOS.get("/api/--", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default ---;
