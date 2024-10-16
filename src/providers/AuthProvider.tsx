import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";
import { getUser, updateProfile } from "../firebase/profile";
import { useNavigate } from "react-router";

interface AuthContextProps {
  user: User | null;
  isUserLoading: boolean;
}
export const AuthContext = React.createContext({} as AuthContextProps);
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserLoading, setIsLoading] = React.useState(true);
  const nav = useNavigate();
  const goToSignUp = () => {
    nav('/signup')
  }
  const [user, setUser] = React.useState<User | null>({} as User);
 
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Note: this logic should be added in your signin process and not here.
        setIsLoading(false);
        setUser(user);
          if(user.metadata.creationTime === user.metadata.lastSignInTime){
            goToSignUp()
            return;
          }
        getUser(user.uid).then((res) => {
          if(res){
            return;
          } else {
            goToSignUp();
            return;
          }
        })

      } else {
        queryClient.invalidateQueries({ queryKey: ["getUser"], exact: true});
        setIsLoading(false);
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user?.uid]);
  const value = {
    user,
    isUserLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
