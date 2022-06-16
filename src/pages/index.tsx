import { GetServerSideProps } from "next";

import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Img,
  Input,
  Drawer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useEditableControls,
  useEditableState,
  useToast,
  Image as ChakraImage,
  Checkbox,
} from "@chakra-ui/react";
import Image from "next/image";
import ReactPlayer from "react-player";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Context } from "../contexts/ContextProvider";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../services/apiClient";

import Marquee from "react-fast-marquee";

import { MdArrowRight, MdDarkMode, MdTouchApp } from "react-icons/md";

import Header from "../components/Header";
import {
  RiAddBoxFill,
  RiArrowRightCircleFill,
  RiArrowRightLine,
  RiCloseLine,
  RiDiscordFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiPauseFill,
  RiPlayFill,
  RiPlayLine,
  RiTwitterFill,
  RiYoutubeFill,
} from "react-icons/ri";
import Head from "next/head";
import { Html, Main, NextScript } from "next/document";
import Loading from "../components/Loading";
import { useWindowSize } from "../utils/useWindowSize";
import Link from "next/link";

export default function Index() {
  const { user, signOut, loading } = useContext(Context);

  const [cookies, setCookies] = useState(false);

  const [playing, setPlaying] = useState(true);

  const [banner, setBanner] = useState(false);

  const size = useWindowSize();

  const router = useRouter();

  const [over, setOver] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user]);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  function FirstContent() {
    return (
      <Flex
        maxW={1000}
        justify="space-between"
        w="100%"
        mx="auto"
        align={isWideVersion && "center"}
        flexDir={isWideVersion ? "row" : "column"}
      >
        <Flex flexDir="column" mt="4">
          <Text fontSize="4xl" fontWeight="bold" color="#333">
            A plataforma que você precisava para subir o seu curso online
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="#999">
            Inicie seu teste gratuito agora mesmo
          </Text>
          <Link href="/signup" passHref>
            <Flex
              _hover={{
                backgroundColor: "#444",
                cursor: "pointer",
              }}
              mt="4"
              style={{
                width: 250,
              }}
              py="4"
              borderRadius="5"
              bg="#333"
              justify="center"
              align="center"
            >
              <Text color="#FFF" fontWeight="bold">
                Criar meu curso
              </Text>
            </Flex>
          </Link>
        </Flex>
        <ChakraImage
          mt={!isWideVersion && "10"}
          fit="contain"
          ml={isWideVersion && "6"}
          style={{
            width: isWideVersion ? "50%" : "100%",
            height: isWideVersion && 400,
          }}
          src="https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </Flex>
    );
  }

  function SecondContent() {
    function SecondContentChoices() {
      function SecondContentChoice({ title, subtitle, bottom = false }) {
        return (
          <Flex
            cursor="pointer"
            flexDir="column"
            justify="space-between"
            style={{
              width: isWideVersion ? "30%" : "100%",
              height: 150,
            }}
            bg="#fff"
            p="4"
            borderRadius="5"
            mb={!isWideVersion && !bottom && "10"}
          >
            <Text
              color="#333"
              fontSize={isWideVersion ? "xl" : "2xl"}
              fontWeight="bold"
            >
              {title}
            </Text>
            <Flex align="center">
              <Text
                color="#777"
                fontSize={isWideVersion ? "md" : "lg"}
                w={!isWideVersion && "90%"}
                textDecorationLine="underline"
              >
                {subtitle}
              </Text>
              <Icon as={RiArrowRightLine} color="#333" fontSize="md" ml="2" />
            </Flex>
          </Flex>
        );
      }

      return (
        <Flex
          justify="space-between"
          flexDir={isWideVersion ? "row" : "column"}
        >
          <SecondContentChoice
            title="Marketplace"
            subtitle="Anuncie o seu produto e aumente suas vendas"
          />
          <SecondContentChoice
            title="Comunidade"
            subtitle="A comunidade que mais cresce no Brasil"
          />
          <SecondContentChoice
            title="FAQ"
            subtitle="Veja as dúvidas mais frequentes"
            bottom
          />
        </Flex>
      );
    }

    return (
      <Flex maxW={1000} w="100%" mx="auto" mt="50" mb="10">
        <Flex
          flexDir="column"
          w="100%"
          bg="rgba(63,83,217,.1)"
          borderRadius="5"
          p="10"
        >
          <SecondContentChoices />
        </Flex>
      </Flex>
    );
  }

  function ThirdContent() {
    return (
      <Flex
        flexDir="column"
        maxW={1000}
        mx="auto"
        w="100%"
        borderRadius="5"
        my="5"
        pb="1"
        bg="#FDECE7"
      >
        <Text
          mt={isWideVersion ? "20" : "10"}
          fontSize={isWideVersion ? "5xl" : "3xl"}
          color="#333"
          fontWeight="bold"
          w="100%"
          textAlign="center"
        >
          Crie o seu curso em três passos
        </Text>
        <Flex flexDir="column" p="10">
          <Flex mt="10" align="center">
            <Text fontWeight="bold" color="#333" fontSize="50">
              1.
            </Text>
            <Text ml="5" color="#333" fontSize="lg">
              Escolha um nome para o seu curso
            </Text>
          </Flex>
          <Flex mt="10" align="center">
            <Text fontWeight="bold" color="#333" fontSize="50">
              2.
            </Text>
            <Text ml="5" color="#333" fontSize="lg">
              Escolha a cara do seu curso
            </Text>
          </Flex>
          <Flex mt="10" align="center">
            <Text fontWeight="bold" color="#333" fontSize="50">
              3.
            </Text>
            <Text ml="5" color="#333" fontSize="lg">
              Adicione as aulas em formato de video
            </Text>
          </Flex>
        </Flex>
        <Flex justify="center" align="center">
          {isWideVersion && <ChakraImage src="/confetes.png" />}
          <Flex
            mb={!isWideVersion && "5"}
            zIndex={1}
            w={size.width - 100}
            maxW={600}
            cursor="pointer"
            borderRadius="full"
            position={isWideVersion ? "absolute" : null}
            py="5"
            px="10"
            bg="#333"
          >
            <Text fontSize="xl" mx="auto" color="#FFF" fontWeight="bold">
              E com um clique seu curso está pronto 🎉
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Cookies() {
    return (
      <Flex zIndex={2} w="100vw" bottom={0} position="fixed" justify="center">
        <Flex
          zIndex={2}
          flexDir="column"
          position="fixed"
          boxShadow="rgba(0,0,0,0.1) 0 0 10px"
          w="100%"
          maxW={1000}
          mx="auto"
          bottom={0}
          borderTopLeftRadius="20"
          borderTopRightRadius="20"
          bg="#FFF"
          p="6"
        >
          <Text color="#333" fontSize={isWideVersion ? "xl" : "md"}>
            By clicking “Accept All Cookies”, you agree to the storing of
            cookies on your device to enhance site navigation, analyze site
            usage, and assist in our marketing efforts
          </Text>
          <Flex mt="4">
            <Flex
              w="50%"
              cursor="pointer"
              px="6"
              py="4"
              justify="center"
              align="center"
              borderRadius="5"
              bg="#FFF"
              border="1px solid #333"
            >
              <Text color="#333">Cookies Settings</Text>
            </Flex>
            <Flex
              onClick={() =>
                setTimeout(() => {
                  setCookies(!cookies);
                }, 100)
              }
              w="50%"
              ml="4"
              cursor="pointer"
              px="6"
              py="4"
              justify="center"
              align="center"
              borderRadius="5"
              bg="#2b85ff"
            >
              <Text color="#FFF" fontWeight="bold">
                Accept All Cookies
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex flexDir="column">
        <Flex py="10" justify="space-between">
          {isWideVersion && (
            <Flex mr="4" flexDir="column" w="100%" justify="space-between">
              <Text
                cursor="pointer"
                fontWeight="bold"
                color="#333"
                fontSize="lg"
              >
                O quê você procura?
              </Text>
              <Link href="/admin">
                <Text
                  mt="4"
                  textDecorationLine="underline"
                  cursor="pointer"
                  color="#333"
                  fontSize="lg"
                >
                  Painel do instrutor
                </Text>
              </Link>
              <Link href="/">
                <Text
                  textDecorationLine="underline"
                  mt="4"
                  cursor="pointer"
                  color="#333"
                  fontSize="lg"
                >
                  Marketplace
                </Text>
              </Link>
            </Flex>
          )}
          <Flex flexDir="column" w="100%" justify="space-between">
            <Text cursor="pointer" fontWeight="bold" color="#333" fontSize="lg">
              Precisa de ajuda?
            </Text>
            <Link href="/">
              <Text
                mt="4"
                textDecorationLine="underline"
                cursor="pointer"
                color="#333"
                fontSize="lg"
              >
                Como criar meu curso?
              </Text>
            </Link>
            <Link href="/">
              <Text
                textDecorationLine="underline"
                mt="4"
                cursor="pointer"
                color="#333"
                fontSize="lg"
              >
                Perguntas frequentes
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex py="10" borderTop="1px solid #e0e0e0">
          <Flex flexDir="column" w="100%" justify="space-between">
            <Text cursor="pointer" color="#000" fontSize="xl">
              Uppernodes
            </Text>
            <Text cursor="pointer" color="#333" fontSize="md">
              Endereço: Avenida 7 de setembro, nº 290, Goiânia - GO
            </Text>
            <Text cursor="pointer" color="#333" fontSize="md">
              Contato: suporte@uppernodes.com
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  if (loading || user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>

      <Header none={true} />

      <Flex flexDir="column" w="100vw" px="6">
        <FirstContent />
        <SecondContent />
        <ThirdContent />
        <Footer />
      </Flex>

      {cookies && <Cookies />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  return {
    props: {},
  };
};
