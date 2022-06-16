import {
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Context } from "../contexts/ContextProvider";
import { useWindowSize } from "../utils/useWindowSize";

export default function Forgot() {
  const { user, signIn, signUp } = useContext(Context);

  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const size = useWindowSize();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (user) {
    router.push("/");
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
        <Flex
          flexDir="column"
          py="4"
          justify="space-between"
          align="center"
          bg="#FFF"
          h="100vh"
          w="100vw"
        >
          <Flex align="center">
            <Image
              onClick={() => router.push("/")}
              src="http://localhost:5556/images/inconformedia.png"
              w="45"
              h="45"
              ml={-5}
              mr="2"
            />
            <Flex flexDir="column">
              <Link href="/">
                <Text
                  cursor="pointer"
                  fontSize="22"
                  fontWeight="bold"
                  color="#000"
                >
                  Uppernodes
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex
            borderRadius="5"
            mt="4"
            flexDir="column"
            p={isWideVersion ? "6" : "6"}
            justify="center"
            align="center"
          >
            <Text
              color="#555"
              w="100%"
              textAlign="left"
              fontSize="3xl"
              fontWeight="bold"
            >
              Esqueceu sua senha?
            </Text>

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              placeholder="Digite seu email"
              type="password"
            />

            <Text
              mt="4"
              w={size.width - 50}
              maxW={500}
              fontSize="xs"
              color="#aaa"
            >
              Ao clicar em continuar você receberá em seu email o link para que
              você possa redefinir sua senha
            </Text>
            <Flex
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
            <Text mt="4" fontSize="xs" color="#aaa">
              OU
            </Text>

            <div
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#eee",
                marginTop: 20,
              }}
            />
            <Flex justify="space-around" w="100%" align="center">
              <Link href="/signin">
                <Text cursor="pointer" color="#0000aa" fontSize="lg" mt="4">
                  Entrar na sua conta
                </Text>
              </Link>
              <Text color="#0000aa" fontSize="lg" mt="4">
                •
              </Text>
              <Link href="/signup">
                <Text cursor="pointer" color="#0000aa" fontSize="lg" mt="4">
                  Criar sua conta
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex
            borderTop="1px solid transparent"
            w={size.width > 800 ? 500 : 350}
            flexDir="column"
            justify="center"
            align="center"
          ></Flex>
        </Flex>
      )}
    </Flex>
  );
}
