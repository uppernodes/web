import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  RiAppleFill,
  RiAppleLine,
  RiGoogleFill,
  RiLock2Line,
} from "react-icons/ri";
import Header from "../components/Header";
import { Context } from "../contexts/ContextProvider";
import { useWindowSize } from "../utils/useWindowSize";

export default function SignUp() {
  const { user, signIn, signUp } = useContext(Context);

  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const size = useWindowSize();

  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      if (user._id) {
        router.push("/admin");
      }
    }
  }, [user]);

  async function handleSignIn() {
    const response = await signIn({ email, password });
    console.log(response);
    if (response.error === true) {
      toast({
        status: "error",
        description: response.message,
      });
    } else if (response.status === "Sucesso!") {
      toast({
        status: "success",
        description: response.message,
      });
    }
  }

  return (
    <Flex h="100%" bg="#fafafa">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {user ? (
        <Flex justify="center" align="center" h="100vh" w="100vw">
          <Spinner size="xl" color="#42ba96" />
        </Flex>
      ) : (
        <Flex flexDir="column" align="center" bg="#FFF" h="100vh" w="100vw">
          <Header none/>
          <Flex borderRadius="5" flexDir="column">
            <Flex flexDir="column" my="2">
              <Text
                mt={size.width < 600 ? "2" : "12"}
                color="#555"
                w="100%"
                textAlign="left"
                fontSize="3xl"
                fontWeight="bold"
              >
                Entrar na sua conta
              </Text>
              <Link href="/signup">
                <Text color="#0000aa" cursor="pointer" fontSize="lg">
                  Ou clique aqui para registrar sua conta
                </Text>
              </Link>
            </Flex>
            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              autoCapitalize="none"
              placeholder="Digite seu email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              placeholder="Sua senha"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />

            <Text
              mt="4"
              w={size.width - 50}
              maxW={500}
              fontSize="xs"
              color="#aaa"
            ></Text>
            <Flex
              onClick={() => {
                if (!email) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir seu email",
                  });
                } else if (!password) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir sua senha",
                  });
                } else {
                  handleSignIn();
                }
              }}
              _hover={{
                transition: "0.5s",
                color: "#FFF",
                backgroundColor: "green",
              }}
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#ddd"
              color="#333"
              borderRadius="5"
              justify="center"
              align="center"
            >
              Continuar
            </Flex>
            <Text mt="4" w="100%" textAlign="center" fontSize="xs" color="#aaa">
              OU
            </Text>
            <Flex
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#FFF"
              color="#333"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              borderRadius="5"
              justify="center"
              align="center"
            >
              <Icon
                as={RiGoogleFill}
                mt={-1}
                mr="2"
                color="#000"
                fontSize="18"
              />
              <Text>Continuar com Google</Text>
            </Flex>
            <Flex
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#FFF"
              color="#333"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              borderRadius="5"
              justify="center"
              align="center"
            >
              <Icon
                as={RiAppleFill}
                mt={-1}
                mr="2"
                color="#000"
                fontSize="18"
              />
              <Text>Continuar com Apple</Text>
            </Flex>

            <Flex justify="space-around" w="100%" align="center">
              <Link href="/forgot">
                <Text cursor="pointer" color="#0000aa" fontSize="lg" mt="6">
                  Esqueceu sua senha?
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
