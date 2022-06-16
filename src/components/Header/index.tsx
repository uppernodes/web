import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BiHelpCircle, BiLogOut, BiStore, BiWallet } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import {
  RiCloseCircleFill,
  RiCloseFill,
  RiCloseLine,
  RiEye2Fill,
  RiEyeLine,
  RiUserLine,
} from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";

export default function Header({ none = false }) {
  const { user, signOut } = useContext(Context);

  const [menu, setMenu] = useState(false);

  const router = useRouter();

  // LUMCuagNtbEyvS4 mdb
  // dimitrious mdb.user
  // rXK9z3eU9MZbhPRE mdb.password

  // ricardofsdomene@icloud.com
  // Azd202020

  return (
    <>
      <Flex
        align="center"
        borderBottom="1px solid #e7e7e7"
        w="100vw"
        style={{ height: 80, paddingLeft: 10, paddingRight: 20 }}
      >
        <Flex justify="space-between" align="center" w="100%">
          <Flex flexDir="row" align="center" ml="2">
            <Image
              mr="4"
              src="/uppernodes-pb.jpg"
              style={{
                height: 50,
                width: 50,
              }}
              borderRadius="5"
            />
            <Text fontSize="xl" color="#333">
              Uppernodes Learning System
            </Text>
          </Flex>
          {user && (
            <Avatar
              style={{
                width: 45,
                height: 45,
              }}
              name={user ? user.name : "Usuário"}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
}
