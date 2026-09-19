import User from "../schema/users";
import crudRepo from "./crudRepo";

const userRepo = {
  ...crudRepo(User),
  getByEmail:async function (email) {
    const user = await User.findOne({email});
    return user;
  },
  getByUsername:async function (username) {
    const user = await User.findOne({username});
    return user;
  }
}

// export const getUserByEmail = async(email) =>{
//   const user = await User.findOne({email});
//   return user;
// };

// export const getUserByName = async(name) =>{
//   const user = await User.findOne({username:name});
//   return user;
// };

// // export const createUser = async(user) =>{
// //   const newUser = await User.create(user);
// //   return newUser;
// // };

// // export const getUsers  = async() => {
// //   const users = await User.find();
// //   return users;
// // };

// // export const getUserById = async(id) =>{
// //   const user = User.findById(id);
// //   return user;
// // };

// // export const deleteUser = async(id) => {
// //   const user = await User.findByIdAndDelete(id);
// //   return user
// // };

// // export const updateUser = async(id, user) => {
// //   const user = await User.findByIdAndUpdate(id, user, {new:true});
// //   return user;
// // };

// const crudMethodes = crudRepo(User);

export default userRepo;