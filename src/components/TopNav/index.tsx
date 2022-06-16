import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BiListPlus, BiLogOut, BiUserPlus } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import {
  RiEditFill,
  RiMenu2Line,
  RiMenuLine,
  RiNotification2Line,
  RiSearch2Line,
} from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";

export default function TopNav() {
  const { user, loading, signOut } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex
      zIndex="1000"
      position="fixed"
      boxShadow="rgba(0,0,0,0.1) 0 0 10px"
      style={{ width: "100vw" }}
      align="center"
      mx="auto"
      bg={darkMode ? "#333" : "#eee"}
      p="4"
      justify="space-between"
      flexDir="row"
    >
      <Flex flexDir="row" align="center">
        <Link href={user && user._id ? "/admin" : "/"}>
          <Flex cursor="pointer" align="center" flexDir="row">
            <Image
              borderRadius="full"
              src="http://localhost:5556/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
            <Flex flexDir="column" align="flex-end"></Flex>
          </Flex>
        </Link>
      </Flex>
      <Flex flexDir="row" align="center"></Flex>
    </Flex>
  );
}
