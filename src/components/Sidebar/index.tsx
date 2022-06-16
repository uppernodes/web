import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  MdAnalytics,
  MdCreateNewFolder,
  MdFolder,
  MdHelpCenter,
  MdUpload,
  MdVideocam,
  MdVideoCameraBack,
} from "react-icons/md";
import {
  FcAutomatic,
  FcBarChart,
  FcCustomerSupport,
  FcGrid,
  FcMenu,
  FcMoneyTransfer,
  FcOpenedFolder,
  FcPlus,
  FcReading,
  FcUpLeft,
  FcVideoCall,
} from "react-icons/fc";
import { Context } from "../../contexts/ContextProvider";
import { useWindowSize } from "../../utils/useWindowSize";
import {
  RiCloseCircleFill,
  RiEyeLine,
  RiMenu2Fill,
  RiMenu4Fill,
  RiMenuFoldFill,
  RiSettings2Fill,
  RiUserLine,
} from "react-icons/ri";
import { BiHelpCircle, BiLogOut, BiStore, BiWallet } from "react-icons/bi";

export default function Sidebar({ none = false }) {
  const { loading } = useContext(Context);

  const router = useRouter();

  const size = useWindowSize();

  const { user, signOut, isSidebarOpen, setIsSidebarOpen } =
    useContext(Context);

  useEffect(() => {
    if (size.width > 700) {
      setIsSidebarOpen(false);
    }
  }, [size]);

  return (
    <>
      <Flex
        zIndex="4"
        position="absolute"
        align="center"
        w="100vw"
        style={{
          height: 80,
          padding: 10,
        }}
        bg="#FFF"
      >
        <Flex
          borderBottom="1px solid #eee"
          position="fixed"
          style={{
            height: 79,
            paddingRight: 30,
          }}
          bg="#FFF"
          w="100%"
          align="center"
          justify="space-between"
        >
          <Flex flexDir="row">
            {size.width < 700 && (
              <Icon
                cursor="pointer"
                onClick={() =>
                  isSidebarOpen
                    ? setIsSidebarOpen(false)
                    : setIsSidebarOpen(true)
                }
                as={isSidebarOpen ? RiCloseCircleFill : RiMenu4Fill}
                mr="1"
                color="#000"
                fontSize="40"
              />
            )}
            <Flex flexDir="row" align="center" ml="2">
              {size.width > 700 && (
                <Image
                  mr="4"
                  src="/uppernodes-pb.jpg"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  borderRadius="5"
                />
              )}
              <Text fontSize="xl" color="#333">
                Uppernodes Learning
              </Text>
            </Flex>
          </Flex>
          <Menu>
            <MenuButton>
              {!none && (
                <Avatar
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  name={user ? user.name : "Usuário"}
                />
              )}
            </MenuButton>
            <MenuList
              bg="#FFF"
              border="1px solid #eee"
              boxShadow="rgba(0,0,0,0.1) 0 0 5px"
            >
              <Flex
                flexDir="column"
                justify="center"
                align="center"
                px="4"
                py="4"
              >
                <Avatar
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  name={user ? user.name : "Usuário"}
                />
                <Text mt="4" fontWeight="medium" color="#333">
                  {user && user.name}
                </Text>
              </Flex>
              <Flex
                zIndex="1"
                borderTop="1px solid #fafafa"
                py="1"
                w="100%"
                borderBottom="1px solid #fafafa"
                justifyContent="center"
                px="2"
                mb="4"
              >
                <Tooltip
                  bg="#333"
                  color="#FFF"
                  px="3"
                  label="Ir até o marketplace"
                >
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={BiStore} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
                <Tooltip
                  bg="#333"
                  color="#FFF"
                  px="3"
                  label="Visualizar seu perfil"
                >
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={RiEyeLine} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
                <Tooltip
                  bg="#333"
                  color="#FFF"
                  px="3"
                  label="Configurações de pagamento"
                >
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={BiWallet} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
                <Tooltip bg="#333" color="#FFF" px="3" label="Central de ajuda">
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={BiHelpCircle} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
              </Flex>
              <Flex flexDir="column" px="2">
                <Flex
                  onClick={() => router.push("/settings")}
                  _hover={{
                    backgroundColor: "#fafafa",
                  }}
                  cursor="pointer"
                  p="2"
                  w="100%"
                  borderRadius="5"
                  align="center"
                >
                  <Icon as={RiSettings2Fill} color="#333" fontSize="sm" />
                  <Text color="#333" fontSize="sm" ml="2">
                    Configurações
                  </Text>
                </Flex>
                <Flex
                  onClick={signOut}
                  _hover={{
                    backgroundColor: "#fafafa",
                  }}
                  cursor="pointer"
                  p="2"
                  w="100%"
                  borderRadius="5"
                  align="center"
                >
                  <Icon as={BiLogOut} color="#333" fontSize="sm" />
                  <Text color="#333" fontSize="sm" ml="2">
                    Sair da sua conta
                  </Text>
                </Flex>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {size.width < 700 && isSidebarOpen && (
        <Flex
          position="absolute"
          flexDir="column"
          zIndex="3"
          w="100%"
          bg="#FFF"
          style={{
            paddingTop: 80,
          }}
        >
          <Flex
            cursor="pointer"
            px="2"
            py="4"
            _hover={{
              backgroundColor: "#eaeaea",
            }}
            align="center"
            borderRadius="5"
          >
            <Icon as={FcPlus} color="#333" fontSize="40" />
            {isSidebarOpen && (
              <Flex flexDir="column" ml="2">
                <Text fontSize="md" color="#333" fontWeight="thin">
                  Criar curso
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex
            cursor="pointer"
            px="2"
            py="4"
            _hover={{
              backgroundColor: "#eaeaea",
            }}
            align="center"
            borderRadius="5"
          >
            <Icon as={FcOpenedFolder} color="#333" fontSize="40" />
            {isSidebarOpen && (
              <Flex flexDir="column" ml="2">
                <Text fontSize="md" color="#333" fontWeight="thin">
                  Meus cursos
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
      {size.width > 700 && !loading && (
        <Flex
          position="fixed"
          zIndex="1"
          borderRight="1px solid #eaeaea"
          style={{
            width: 79,
            height: "100vh",
            backgroundColor: "#FFF",
          }}
        >
          <Flex
            flexDir="column"
            justify="space-between"
            style={{
              padding: 10,
            }}
          >
            <Flex />
            <Flex flexDir="column">
              <Tooltip
                bg="#FFF"
                color="#333"
                ml="2"
                borderRadius="5"
                p="2"
                label="Clique para ver seus relatórios"
              >
                <Flex
                  cursor="pointer"
                  p="2"
                  _hover={{
                    boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                  }}
                  align="center"
                  borderRadius="5"
                >
                  <Icon as={FcBarChart} color="#333" fontSize="40" />
                </Flex>
              </Tooltip>
              <Tooltip
                bg="#FFF"
                color="#333"
                ml="2"
                borderRadius="5"
                p="2"
                label="Clique para ver seus alunos"
              >
                <Flex
                  cursor="pointer"
                  p="2"
                  _hover={{
                    boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                  }}
                  align="center"
                  borderRadius="5"
                >
                  <Icon as={FcReading} color="#333" fontSize="40" />
                </Flex>
              </Tooltip>
            </Flex>
            <Flex>
              <Tooltip
                bg="#FFF"
                color="#333"
                ml="2"
                borderRadius="5"
                p="2"
                label="Configurações"
              >
                <Flex
                  cursor="pointer"
                  p="2"
                  onClick={() => router.push("/settings")}
                  _hover={{
                    boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                  }}
                  align="center"
                  borderRadius="5"
                >
                  <Icon as={FcAutomatic} color="#333" fontSize="40" />
                </Flex>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
