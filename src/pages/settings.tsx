import {
  Box,
  DarkMode,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
  Switch,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdSettings, MdStore } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import {
  RiBankCardFill,
  RiCloseFill,
  RiCouponFill,
  RiGlobeFill,
  RiLogoutBoxRFill,
  RiMessage3Fill,
  RiMoneyDollarCircleFill,
  RiShoppingCartFill,
  RiWalletFill,
} from "react-icons/ri";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Context } from "../contexts/ContextProvider";
import { useWindowSize } from "../utils/useWindowSize";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Settings() {
  const size = useWindowSize();

  const [darkMode, setDarkMode] = useState(false);

  const { user, loading, setLoading, signOut } = useContext(Context);

  const [tab, setTab] = useState("Informações do usuário");

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  useEffect(() => {
    onOpen();
  }, []);

  const series = [
    {
      name: "series1",
      data: [13, 120, 10, 28, 51, 18, 80],
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: darkMode ? "#EEE" : "#333",
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: "#333",
      },
      axisTicks: {
        color: "#333",
      },
      categories: [
        "2021-03-18T00:00:00.000Z",
        "2021-03-19T00:00:00.000Z",
        "2021-03-20T00:00:00.000Z",
        "2021-03-21T00:00:00.000Z",
        "2021-03-22T00:00:00.000Z",
        "2021-03-23T00:00:00.000Z",
        "2021-03-24T00:00:00.000Z",
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.5,
      },
    },
  };

  function UserData() {
    return (
      <Flex
        ml={isWideVersion && "4"}
        style={{
          width: "100%",
        }}
        p="2"
        borderRadius="5"
        flexDir="column"
      >
        <Flex flexDir="column" pb={!isWideVersion && "4"}>
          <Flex w="100%" justify="space-between">
            <Text
              color={darkMode ? "#EEE" : "#333"}
              fontSize={isWideVersion ? "xl" : "lg"}
              fontWeight="bold"
            >
              Informações do usuário
            </Text>
            <Text
              textDecorationLine="underline"
              cursor="pointer"
              color={darkMode ? "#FFF" : "#333"}
            >
              Editar
            </Text>
          </Flex>

          <Flex
            bg={darkMode ? "#333" : "#FFF"}
            borderRadius="5"
            p={isWideVersion ? "6" : "4"}
            mt="4"
            justify={isWideVersion ? "space-between" : "space-between"}
          >
            <Flex flexDir="column" align="flex-start">
              <Text
                color={darkMode ? "#FFF" : "#000"}
                fontSize={size.width > 1000 ? "22" : "14"}
                fontWeight="medium"
              >
                Seu nome
              </Text>
              <Text
                color={darkMode ? "#FFF" : "#000"}
                mt="2"
                fontSize={size.width > 1000 ? "16" : "14"}
              >
                {user && user.name}
              </Text>
            </Flex>
            <Flex flexDir="column" align="flex-start">
              <Text
                color={darkMode ? "#FFF" : "#000"}
                fontSize={size.width > 1000 ? "22" : "14"}
                fontWeight="medium"
              >
                Seu email
              </Text>
              <Text
                color={darkMode ? "#FFF" : "#000"}
                mt="2"
                fontSize={size.width > 1000 ? "16" : "14"}
              >
                {user && user.email}
              </Text>
            </Flex>
            <Flex flexDir="column" align="flex-start"></Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Faturamento() {
    return (
      <Flex
        mt={!isWideVersion && "4"}
        ml={isWideVersion && "4"}
        style={{
          width: "100%",
        }}
        borderRadius="5"
        p="2"
        flexDir="column"
      >
        <Flex flexDir="column" pb={!isWideVersion && "4"}>
          <Flex w="100%" justify="space-between">
            <Text
              color={darkMode ? "#EEE" : "#333"}
              fontSize={isWideVersion ? "xl" : "lg"}
              fontWeight="bold"
            >
              Faturamento
            </Text>

            <Text
              textDecorationLine="underline"
              cursor="pointer"
              color={darkMode ? "#FFF" : "#333"}
            >
              Últimos 7 dias
            </Text>
          </Flex>

          <SimpleGrid
            mt="4"
            flex="1"
            gap="4"
            minChildWidth={320}
            alignItems="flex-start"
          >
            <Box
              p={["6", "8"]}
              bg={darkMode ? "#333" : "#FFF"}
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4" color={darkMode ? "#FFF" : "#333"}>
                Bruto
              </Text>
              {series.length > 0 && (
                <Chart
                  type="area"
                  height="160"
                  series={series}
                  options={options}
                />
              )}
            </Box>
            <Box
              p={["6", "8"]}
              bg={darkMode ? "#333" : "#FFF"}
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4" color={darkMode ? "#FFF" : "#333"}>
                Liquido
              </Text>
              {series.length && (
                <Chart
                  type="area"
                  height="160"
                  series={series}
                  options={options}
                />
              )}
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    );
  }

  function TabItem({ title, icon }) {
    return (
      <Flex
        _hover={{
          backgroundColor: darkMode ? "#3F3F3F" : "#F0F0F0",
        }}
        onClick={() => {
          if (title === "Sair da sua conta") {
            setLoading(true);
            setTimeout(() => {
              onClose();
            }, 1000);
            setTimeout(() => {
              signOut();
            }, 1000);
          } else {
            setTab(title);
          }
        }}
        cursor={tab === title ? "default" : "pointer"}
        w="100%"
        borderBottomRadius={title === "Sair da sua conta" ? "5" : "0"}
        bg={
          tab === title && darkMode
            ? "#3F3F3F"
            : darkMode
            ? "#333"
            : tab === title
            ? "#f0f0f0"
            : "#FFF"
        }
        px="4"
        py="2"
        border={darkMode ? "1px solid #555" : "1px solid #f0f0f0"}
        align="center"
        color="#333"
      >
        <Icon
          as={icon}
          color={darkMode ? "#FFF" : "#333"}
          fontSize="lg"
          mr="2"
        />
        <Text
          ml="2"
          fontSize="sm"
          fontWeight={tab === title && "bold"}
          color={darkMode ? "#EEE" : "#333"}
        >
          {title}
        </Text>
      </Flex>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header/>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => {
          onClose();
          router.push("/admin");
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          height={size.height - 80}
          bg={darkMode ? "#333" : "#eee"}
          borderTopLeftRadius="10"
          borderTopRightRadius="10"
        >
          <DrawerHeader
            bg={darkMode ? "#333" : "#fff"}
            justifyContent="space-between"
            borderTopLeftRadius="10"
            borderTopRightRadius="10"
            py="6"
            px="4"
            w="100%"
            alignItems="center"
            borderBottom={darkMode ? "1px solid #333" : "1px solid #e0e0e0"}
          >
            <Flex flexDir="row" justify="space-between">
              <Flex align="center">
                <Icon
                  as={MdSettings}
                  color={darkMode ? "#FFF" : "#333"}
                  fontSize="xl"
                />
                <Text ml="2" color={darkMode ? "#FFF" : "#333"} fontSize="xl">
                  Configurações
                </Text>
              </Flex>
              <Flex
                onClick={() => {
                  router.push("/admin");
                  onClose();
                }}
                cursor="pointer"
                _hover={{
                  opacity: 0.8,
                }}
                bg="#e0e0e0"
                style={{
                  height: 33,
                  width: 33,
                }}
                justify="center"
                align="center"
                borderRadius="5"
              >
                <Icon as={RiCloseFill} fontSize="xl" color="#000" />
              </Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody bg={darkMode && "#222"}>
            <Flex flexDir={isWideVersion ? "row" : "column"} mt="4">
              <Flex
                position={isWideVersion ? "fixed" : null}
                display={isWideVersion ? null : "none"}
                w={isWideVersion ? 250 : "100%"}
                maxW={isWideVersion && 470}
                borderRadius="5"
                boxShadow="rgba(0,0,0,0.1) 0 0 10px"
                p={isWideVersion ? "0" : "2"}
                flexDir="column"
              >
                {isWideVersion && (
                  <Flex flexDir="column">
                    <Flex
                      w="100%"
                      bg={darkMode ? "#333" : "#FFF"}
                      px="4"
                      borderTopLeftRadius="5"
                      borderTopRightRadius="5"
                      py="2"
                      border={darkMode ? "1px solid #555" : "1px solid #f0f0f0"}
                      align="center"
                      color="#333"
                    >
                      <Flex mt="4" flexDir="column" pb="4">
                        <Text color={darkMode ? "#FFF" : "#333"} fontSize="lg">
                          {/* {user &&
                                user.name.split(" ")[0] +
                                  " " +
                                  user.name.split(" ")[
                                    user.name.split(" ").length - 1
                                  ]} */}
                          {user &&
                            user.name.split(" ")[0] +
                              " " +
                              user.name.split(" ")[
                                user.name.split(" ").length - 1
                              ]}
                        </Text>
                        <Flex align="center" cursor="pointer">
                          <Text
                            color={darkMode ? "tomato" : "#1f5199"}
                            fontSize="sm"
                          >
                            uppernodes.com/ricardofonseca
                          </Text>
                          <Icon
                            ml="1"
                            as={FiExternalLink}
                            color={darkMode ? "tomato" : "#1f5199"}
                            fontSize="xs"
                          />
                        </Flex>
                        {/* <FormControl mt="6" display="flex" alignItems="center">
                          <FormLabel
                            htmlFor="email-alerts"
                            mb="0"
                            color={darkMode ? "#FFF" : "#333"}
                          >
                            {darkMode ? "Modo luz" : "Modo escuro"}
                          </FormLabel>
                          <Switch
                            id="email-alerts"
                            isChecked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                          />
                        </FormControl> */}
                      </Flex>
                    </Flex>

                    <TabItem title="Informações do usuário" icon={MdStore} />
                    <TabItem
                      title="Faturamento"
                      icon={RiMoneyDollarCircleFill}
                    />
                    <TabItem title="Pagamentos" icon={RiBankCardFill} />
                    <TabItem
                      title="Receber pagamentos"
                      icon={RiShoppingCartFill}
                    />
                    <TabItem title="Cupons de desconto" icon={RiCouponFill} />
                    <TabItem title="Domínios" icon={RiGlobeFill} />
                  </Flex>
                )}
              </Flex>

              <Flex
                flexDir="column"
                w="100%"
                style={{
                  paddingLeft: isWideVersion && 250,
                }}
              >
                {isWideVersion ? (
                  <>
                    {tab === "Informações do usuário" && <UserData />}
                    {tab === "Faturamento" && <Faturamento />}
                  </>
                ) : (
                  <>
                    <UserData />
                    <Faturamento />
                  </>
                )}
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
