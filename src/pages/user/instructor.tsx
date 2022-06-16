import {
  Flex,
  Image,
  Text,
  toast,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import { Context } from "../../contexts/ContextProvider";
import { api } from "../../services/apiClient";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Instructor() {

  const { user } = useContext(Context);

  const size = useWindowSize();

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const becomeInstructor = async () => {
    api
      .post("/auth/make-instructor", {
        id: user
      })
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast({
          status: "error",
          description: "Stripe onboarding failed. Try again.",
          duration: 3000,
        });
        setLoading(false);
      });
  };

  function FirstContent() {
    return (
      <Flex
        maxW={1000}
        justify="center"
        w="100%"
        px="4"
        mx="auto"
        align={isWideVersion && "center"}
        flexDir="column"
      >
        <Image src="https://github.com/ricardofsdomene.png" />
        <Flex flexDir="column" mt="4">
          <Text
            fontSize="2xl"
            textAlign="center"
            w="100%"
            fontWeight="bold"
            color="#333"
          >
            Você precisa habilitar uma conta bancária para receber pagamentos
          </Text>
          <Text fontSize="lg" textAlign="center" w="100%" color="#888">
            Você será redirecionado para a Stripe para completar o seu processo
            de habilitação.
          </Text>
          <Flex
            onClick={becomeInstructor}
            mx="auto"
            _hover={{
              backgroundColor: "#444",
              cursor: "pointer",
            }}
            mt="4"
            style={{
              width: isWideVersion ? 300 : "100%",
            }}
            py="4"
            borderRadius="5"
            bg="#333"
            justify="center"
            align="center"
          >
            <Text color="#FFF" fontWeight="bold">
              Receber pagamentos
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Flex flexDir="column" bg="#EEE">
        <FirstContent />
      </Flex>
    </>
  );
}
