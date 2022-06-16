import React, { useContext, useState } from "react";
import {
  Text,
  Flex,
  Button,
  Image,
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
  useBreakpointValue,
  toast,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  RiDiscLine,
  RiDiscordFill,
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiUserLine,
} from "react-icons/ri";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Head from "next/head";
import { Context } from "../contexts/ContextProvider";
import Loading from "../components/Loading";

// 404 Illustration
// by Natasha Kukhalskaya

export default function NotFound() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const { user, signOut, loading } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  const toast = useToast();
  const router = useRouter();

  function Content() {
    return (
      <Flex
        flexDir="column"
        justify="space-between"
        align="center"
        maxW={1000}
        mx="auto"
        p="4"
        w="100%"
        h="100%"
      >
        <Flex
          position="sticky"
          justify="center"
          left="4"
          top="5"
          w="100%"
          align="center"
          maxW={700}
          mx="auto"
        ></Flex>
        <Flex flexDir="column" w="100%">
          <Text
            mt="4"
            color={darkMode ? "#FFF" : "#744CC6"}
            fontFamily="'Comfortaa', cursive"
            fontWeight="bold"
            w="100%"
            textAlign="left"
            fontSize="7xl"
          >
            Eita
          </Text>
          <Text
            w="100%"
            textAlign="left"
            color={darkMode ? "#FFF" : "#744CC6"}
            fontFamily="'Comfortaa', cursive"
            fontSize={isWideVersion ? "xl" : "xl"}
          >
            Página não encontrada
          </Text>
        </Flex>
        <Image
          src="http://localhost:5556/images/404.png"
          mr="2"
          mx="10"
          maxW={isWideVersion ? 500 : 350}
        />
        <Flex flexDir="column" w="100%" maxW={700} mr="2" align="flex-end">
          <Link
            href="https://dribbble.com/shots/14468614-404-Illustration"
            passHref={true}
          >
            <Text
              cursor="pointer"
              color="#744CC6"
              fontSize="md"
              fontWeight="bold"
              fontFamily="'Quicksand', sans-serif"
            >
              404
            </Text>
          </Link>
          <Link href="https://dribbble.com/natashakukhalskaya" passHref={true}>
            <Text
              cursor="pointer"
              color="#744CC6"
              fontWeight="semibold"
              fontSize="xs"
              fontFamily="'Quicksand', sans-serif"
            >
              by Natasha Kukhalskaya
            </Text>
          </Link>
        </Flex>
        <Flex
          onClick={() => {
            router.push("/");
          }}
          _hover={{
            boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
            textDecorationLine: "underline",
          }}
          cursor="pointer"
          mt="4"
          w="100%"
          maxW={1000}
          textAlign="left"
          borderRadius="5"
          px="6"
          py="4"
          bg="#744CC6"
          justify="center"
          align="center"
          color="#FFF"
          fontFamily="'Comfortaa', cursive"
          fontWeight="bold"
          fontSize={isWideVersion ? "xl" : "lg"}
        >
          Voltar para o início
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex
        mt="10"
        flexDir="row"
        p="4"
        w="100%"
        mx="auto"
        boxShadow="rgba(0,0,0,0.1) 0 0 10px"
        borderRadius="5"
        align="center"
        justifyContent="space-between"
      >
        <Flex flexDir="column">
          <Link
            href="https://dribbble.com/shots/14468614-404-Illustration"
            passHref={true}
          >
            <Text
              cursor="pointer"
              color={darkMode ? "#FFF" : "#333"}
              fontSize="lg"
              fontWeight="bold"
              fontFamily="'Quicksand', sans-serif"
            >
              Uppernodes
            </Text>
          </Link>
          <Link href="https://dribbble.com/natashakukhalskaya" passHref={true}>
            <Text
              cursor="pointer"
              color={darkMode ? "#FFF" : "#333"}
              fontWeight="regular"
              fontSize="xs"
              fontFamily="'Quicksand', sans-serif"
            >
              Siga-nos em nossas redes sociais
            </Text>
          </Link>
        </Flex>
        <Flex align="center">
          <Icon
            onClick={() => {
              toast({
                status: "warning",
                description: "Em breve teremos nosso servidor no discord",
              });
            }}
            cursor="pointer"
            as={RiDiscordFill}
            mr={isWideVersion ? "6" : "4"}
            color="#744cc6"
            fontSize="4xl"
          />
          <Link href="https://linkedin.com/in/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiLinkedinFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
          <Link href="https://facebook.com/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiFacebookFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
          <Link href="https://github.com/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiGithubFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
        </Flex>
      </Flex>
    );
  }

  if (!user) {
    return <Loading />;
  } else {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <>
      <Flex
        flex="1"
        flexDir="column"
        h="100vh"
        bg={darkMode ? "#333" : "#eee"}
        justifyContent="space-between"
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
        </Head>
        <Header none={false} />
        <Content />
        <Footer />
      </Flex>
      <Flex />
    </>
  );
}
