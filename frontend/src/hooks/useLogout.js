// File to define the logout request

// Context
import { useAuthContext } from "./useAuthContext";
//import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  // Invoke context methods
  const { dispatch: authDispatch } = useAuthContext();
  //const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from local storage

    authDispatch({ type: "LOGOUT" }); // Dispatch logout action
    //workoutsDispatch({ type: "SET_WORKOUTS", payload: null }); // Dispatch function to clear the workouts global states
    alert('logged out')
  };

  return { logout };
};
