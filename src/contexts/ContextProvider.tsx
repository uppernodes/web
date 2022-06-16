import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router, { useRouter } from "next/router";
import { api } from "../services/apiClient";

import { BroadcastChannel } from "broadcast-channel";
import jwtDecode from "jwt-decode";
import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import Loading from "../components/Loading";

type User = {
  _id: string;
  avatar?: string;
  name: string;
  email: string;
  permissions?: string[];
  roles?: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignInResponse = {
  status?: string;
  message?: string;
  error?: boolean;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  status?: string;
  message?: string;
  error?: string;
};

type TUpdate = {
  id: string;
  param: string;
  value: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<SignUpResponse>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  updateName: (values: TUpdate) => Promise<any>;
  loading: boolean;
  setLoading: (value: boolean) => any;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => any;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const Context = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  authChannel.postMessage("signOut");

  // Router.push("/");
}

export function ContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();

  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAuthenticated = !!user;

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (!token) {
      if (router.pathname === "/signin") {
        //
      } else if (router.pathname === "/signup") {
        //
      } else if (router.pathname === "/forgot") {
        //
      } else {
        setTimeout(() => {
          router.push("/");
          setLoading(false);
        }, 500);
      }
    } else if (token) {
      // Verify if token is valid
      // Verify _id permissions and roles 2Check

      const decoded: User = jwtDecode(token);

      // key manager res.data verificar tudo aqui
      api.get(`/auth/user/${decoded._id}`).then((res) => {
        if (!res.data) {
          destroyCookie(undefined, "nextauth.token");
          destroyCookie(undefined, "nextauth.refreshToken");
          router.push("/");
        } else {
          setUser(res.data);
        }
      });

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/auth/sessions", {
        email: email,
        password: password,
      });

      const { _id, name, token, refreshToken, permissions, roles } =
        response.data;

      if (response.data.error) {
        return response.data;
      } else {
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
        setCookie(undefined, "nextauth.refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });

        setUser({
          _id,
          name,
          email,
          permissions,
          roles,
        });

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        Router.push("/admin");

        setLoading(false);

        return {
          status: "Sucesso!",
          message: "Usuario autenticado com sucesso",
        };
      }
    } catch (error) {
      return { status: "Erro!", error: "Tente novamente mais tarde" };
    }
  }

  async function signUp({
    name,
    email,
    password,
  }: SignUpCredentials): Promise<SignUpResponse> {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.status === "Usuário criado com sucesso!") {
        const response = await api.post("/auth/sessions", {
          email: email,
          password: password,
        });

        const { _id, name, token, refreshToken, permissions, roles } =
          response.data;

        if (response.data.error) {
          return response.data.message;
        } else {
          setCookie(undefined, "nextauth.token", token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });
          setCookie(undefined, "nextauth.refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });

          setUser({
            _id,
            name,
            email,
            permissions,
            roles,
          });

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          Router.push("/admin");

          setLoading(false);

          return {
            status: "Sucesso!",
            message: "Usuario autenticado com sucesso",
          };
        }
      } else {
        if (response.data.status === "Erro!") {
          return response.data;
        } else {
          return { status: "Erro!", error: "Dados invalidos" };
        }
      }
    } catch (error) {
      return { status: "Erro!", error: "Tente novamente mais tarde" };
    }
  }

  async function updateName({ id, param, value }: TUpdate) {
    try {
      const response: AxiosResponse = await api.put(
        `/auth/update/${id}/${param}/${value}`
      );

      if (response.data.Message === "Atualizado com sucesso") {
        console.log(response.data);
        setUser(response.data.user);
      } else {
        console.log(2);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    setLoading(true);
    destroyCookie(undefined, "nextauth.token");
    destroyCookie(undefined, "nextauth.refreshToken");

    setUser(null);

    Router.push("/");
    setLoading(false);
  }

  // useEffect(() => {
  //   if (user) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [user]);

  return (
    <Context.Provider
      value={{
        signIn,
        signUp,
        signOut,
        updateName,
        isAuthenticated,
        user,
        loading,
        setLoading,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}
