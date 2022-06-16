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
  Checkbox,
  Image,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Context } from "../../../contexts/ContextProvider";
import { useRouter } from "next/router";
import { api } from "../../../services/apiClient";
import Resizer from "react-image-file-resizer";

import Header from "../../../components/Header";
import {
  RiAddBoxFill,
  RiArrowLeftLine,
  RiArrowRightFill,
  RiArrowRightLine,
  RiCloseFill,
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
import Loading from "../../../components/Loading";
import { useWindowSize } from "../../../utils/useWindowSize";
import {
  BiBadgeCheck,
  BiCalendar,
  BiCertification,
  BiCheck,
  BiImageAdd,
  BiLineChart,
  BiUserCheck,
  BiUserCircle,
  BiUserVoice,
} from "react-icons/bi";
import Sidebar from "../../../components/Sidebar";
import ReactMarkdown from "react-markdown";

export default function Index() {
  const { user, signOut, loading } = useContext(Context);

  // values
  const [uploading, setUploading] = useState<Boolean>();

  const [image, setImage] = useState();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>();
  const [paid, setPaid] = useState<boolean>(false);
  const [model, setModel] = useState<"recurrent" | "lifetime">("recurrent");
  const [category, setCategory] = useState<string>("");

  const [courseLoading, setCourseLoading] = useState<boolean>(false);

  const [values, setValues] = useState({
    name,
    description,
    price,
    uploading,
    paid,
    category,
    courseLoading,
  });

  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [thumbAdded, setThumbAdded] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    if (Number(value) < 10000) {
      setPrice("R$ " + value);
    }
  };

  const size = useWindowSize();

  const router = useRouter();

  const [preview, setPreview] = useState(undefined);
  const [uploadButtonText, setUploadButtonText] = useState("");

  const toast = useToast();

  const handleCreateImage = (e) => {
    if (e.target.files.length !== 0) {
      let file = e.target.files[0];
      setPreview(window.URL.createObjectURL(e.target.files[0]));
      setUploadButtonText(file.name);
      setValues({ ...values, courseLoading: true });

      Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
        try {
          const data = await api.post("/course/upload-image", {
            image: uri,
          });

          setImage(data.data);
          setValues({ ...values, courseLoading: false });
        } catch (err) {
          console.log(err);
          setValues({ ...values, courseLoading: false });
          toast({
            status: "error",
            description: "Image upload failed. Try later.",
            duration: 1000,
          });
        }
      });
    }
  };

  const handleDeleteImage = async () => {
    try {
      if (image) {
        setValues({ ...values, courseLoading: true });
        const res = await api.post("/course/delete-image", { image });
        toast({
          position: "top",
          status: "success",
          description: "Imagem removida com sucesso",
        });
        setImage(null);
        setPreview(null);
        setUploadButtonText("Upload Image");
        setValues({ ...values, courseLoading: false });
      } else {
        toast({
          position: "top",
          status: "error",
          description: "Tente novamente em alguns instantes",
        });
      }
    } catch (err) {
      toast({
        position: "top",
        status: "error",
        description: "erro",
      });
      console.log(err);
      setValues({ ...values, courseLoading: false });
    }
  };

  const handleCreateCourse = async (e) => {
    const res = await api.post("/course/create", {
      name,
      description,
      price: paid ? Number(price.split(" ")[1]) : 0,
      paid,
      category,
      image,
    });
    if (res.data.message === "Curso criado com sucesso!") {
      toast({
        status: "success",
        description: res.data.message,
      });
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } else if (
      res.data.message === "Infelizmente já existe um curso com esse nome"
    ) {
      toast({
        position: "top",
        status: "error",
        description: res.data.message,
      });
    } else {
      toast({
        position: "top",
        status: "error",
        description: "Tente novamente mais tarde",
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  if (!user) {
    return <Loading />;
  } else {
    if (loading) {
      return <Loading />;
    }
  }

  const Category = ({ title }) => {
    return (
      <Flex
        onClick={() => setCategory(title)}
        cursor="pointer"
        borderRadius="full"
        bg={category === title ? "#333" : "transparent"}
        border={category === title ? "1px solid #eee" : "1px solid #e0e0e0"}
        justify="center"
        align="center"
      >
        <Text
          color={category === title ? "#FFF" : "#333"}
          fontSize="sm"
          fontWeight="bold"
        >
          {title}
        </Text>
      </Flex>
    );
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>

      <Sidebar />

      <Drawer
        placement="bottom"
        onClose={() => {
          router.push("/admin");
          onClose();
        }}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius="15" borderTopRightRadius="15">
          <DrawerBody
            maxH={size.width < 500 ? "85vh" : "95vh"}
            style={{
              paddingTop: 0,
              // marginTop: size.width < 500 && page === 2 && paid ? 90 : 0,
            }}
          >
            <Flex
              w="100%"
              maxW={size.width - 40}
              bg="#FFF"
              borderBottom="1px solid #eee"
              position="fixed"
              style={{
                height: 80,
              }}
              justify="space-between"
              align="center"
            >
              <Flex flexDir="column" mt="2">
                <Text fontSize="2xl" color="#333" fontWeight="bold">
                  {page === 1
                    ? "Criar curso"
                    : page === 2
                    ? "Dados do curso"
                    : `Estamos quase lá`}
                </Text>
                <Text fontSize="md" color="#333" fontWeight="thin">
                  {page} de 3
                </Text>
              </Flex>
              <Flex>
                {page !== 3 && preview && name && description && thumbAdded ? (
                  <Flex
                    onClick={() => {
                      if (page === 1) {
                        setPage(2);
                      } else if (page === 2) {
                        setPage(1);
                      } else if (page === 3) {
                        setPage(2);
                      }
                    }}
                    mr="2"
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
                    <Icon
                      as={
                        page === 2
                          ? RiArrowLeftLine
                          : page === 1
                          ? RiArrowRightLine
                          : null
                      }
                      fontSize="xl"
                      color="#333"
                    />
                  </Flex>
                ) : page === 3 ? (
                  <Flex
                    onClick={() => {
                      setPage(2);
                    }}
                    mr="2"
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
                    <Icon as={RiArrowLeftLine} fontSize="xl" color="#333" />
                  </Flex>
                ) : null}
                {page === 2 && category && categoryAdded && (
                  <Flex
                    onClick={() => {
                      setPage(3);
                    }}
                    mr="2"
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
                    <Icon as={RiArrowRightLine} fontSize="xl" color="#333" />
                  </Flex>
                )}
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
            </Flex>
            <Flex
              style={{
                paddingTop: 90,
                height: size.width < 500 ? "80vh" : "90vh",
              }}
            >
              {page === 1 ? (
                <Flex
                  flexDir="column"
                  justify="space-between"
                  w={size.width < 1000 ? "100%" : "50%"}
                >
                  <Flex align="center" w="100%" justify="space-between">
                    {preview && (
                      <Text
                        onClick={handleDeleteImage}
                        cursor="pointer"
                        textDecorationLine="underline"
                        color="#333"
                        my="2"
                        fontSize={isWideVersion ? "lg" : "md"}
                      >
                        Remover capa
                      </Text>
                    )}
                  </Flex>
                  <label>
                    {preview ? (
                      <Image
                        src={preview}
                        maxH={160}
                        maxW={160}
                        borderRadius="5"
                      />
                    ) : (
                      <Flex
                        cursor="pointer"
                        flexDir="column"
                        bg="#eee"
                        borderRadius="5"
                        p="5"
                        style={{
                          height: 160,
                        }}
                        justify="center"
                        align="center"
                      >
                        <Flex bg="#aaa" p="5" borderRadius="full">
                          <Icon as={BiImageAdd} fontSize="xl" color="#999`" />
                        </Flex>
                        <Text
                          color="#aaa"
                          textAlign="center"
                          mt="4"
                          fontSize="lg"
                        >
                          Clique para adicionar uma capa ao seu curso
                        </Text>
                      </Flex>
                    )}
                    <input
                      onChange={handleCreateImage}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        height: 160,
                        background: "#eee",
                        borderRadius: 5,
                        display: "none",
                      }}
                      type="file"
                      accept="image/*"
                    />
                  </label>
                  <Text
                    color="#333"
                    my="2"
                    fontSize={isWideVersion ? "xl" : "md"}
                  >
                    Nome
                  </Text>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    value={name}
                    borderRadius="5"
                    style={{
                      padding: 10,
                      border: "1px solid #e0e0e0",
                      height: 50,
                      color: "#333",
                    }}
                  />
                  <Text
                    color="#333"
                    my="2"
                    fontSize={isWideVersion ? "xl" : "md"}
                  >
                    Descrição
                  </Text>
                  <textarea
                    value={description}
                    onChange={(
                      ev: React.ChangeEvent<HTMLTextAreaElement>
                    ): void => setDescription(ev.target.value)}
                    name="description"
                    style={{
                      padding: 10,
                      color: "#333",
                      width: "100%",
                      borderRadius: 5,
                      border: "1px solid #e0e0e0",
                    }}
                    cols={size.width < 500 ? 4 : size.width < 600 ? 7 : 9}
                    rows={size.width < 500 ? 4 : size.width < 600 ? 7 : 9}
                  ></textarea>
                  <Flex
                    onClick={() => {
                      // also validate if the name is already taken
                      if (!preview) {
                        toast({
                          position: "top",
                          status: "error",
                          description:
                            "Você precisa adicionar uma capa ao seu curso",
                          duration: 1000,
                        });
                      } else if (!name) {
                        toast({
                          position: "top",
                          status: "error",
                          description:
                            "Você precisa adicionar um nome ao seu curso",
                          duration: 1000,
                        });
                      } else if (name.length < 7) {
                        toast({
                          position: "top",
                          status: "error",
                          description:
                            "O nome do seu curso precisa conter pelo menos 7 letras",
                          duration: 1000,
                        });
                      } else if (!description) {
                        toast({
                          position: "top",
                          status: "error",
                          description:
                            "Você precisa adicionar uma descrição ao seu curso",
                          duration: 1000,
                        });
                      } else {
                        if (thumbAdded) {
                          setPage(2);
                        } else {
                          setTimeout(() => {
                            toast({
                              position: "top",
                              status: "success",
                              description: "Dados validados com sucesso",
                              duration: 1000,
                            });
                          }, 250);
                          setTimeout(() => {
                            setPage(2);
                            setThumbAdded(true);
                          }, 750);
                        }
                      }
                    }}
                    cursor="pointer"
                    w="100%"
                    borderRadius="5"
                    bg="#f00066"
                    justify="center"
                    align="center"
                    py="4"
                    mt="4"
                    mb={size.width < 1000 ? "2" : 0}
                  >
                    <Text fontWeight="bold" color="#FFF">
                      Adicionar curso
                    </Text>
                  </Flex>
                </Flex>
              ) : page === 2 ? (
                <Flex
                  flexDir="column"
                  justify="space-between"
                  w={size.width < 1000 ? "100%" : "50%"}
                >
                  <Flex flexDir="column">
                    <Text
                      color="#333"
                      mt="2"
                      fontSize={isWideVersion ? "xl" : "lg"}
                    >
                      Qual categoria o seu curso melhor se encaixa?
                    </Text>
                    <Flex
                      mt="4"
                      display="grid"
                      gridAutoRows={size.width > 1000 ? "35px" : "40px"}
                      gridGap="10px"
                      gridTemplateColumns={
                        size.width < 600 ? "repeat(2, auto)" : "repeat(3, auto)"
                      }
                    >
                      <Category title="Marketing digital" />
                      <Category title="Educação financeira" />
                      <Category title="Programação" />
                      <Category title="Tecnologia" />
                      <Category title="Dropshipping" />
                      <Category title="Outro" />
                    </Flex>
                    <Text mt="6" color="#333" fontSize={"lg"}>
                      Como será o modelo de assinatura do seu curso?
                    </Text>
                    <Flex mt="4">
                      <Checkbox
                        colorScheme="green"
                        onChange={() => {
                          if (paid) {
                            setPaid(false);
                          }
                        }}
                        isChecked={!paid && true}
                      />
                      <Text
                        cursor="pointer"
                        onClick={() => {
                          if (paid) {
                            setPaid(false);
                          }
                        }}
                        ml="2"
                        color="#333"
                      >
                        Gratuíto
                      </Text>
                    </Flex>
                    <Flex mt="4">
                      <Checkbox
                        onChange={() => {
                          if (!paid) {
                            setPaid(true);
                          }
                        }}
                        colorScheme="green"
                        isChecked={paid}
                      />
                      <Text
                        cursor="pointer"
                        onClick={() => {
                          if (!paid) {
                            setPaid(true);
                          }
                        }}
                        ml="2"
                        color="#333"
                      >
                        Pago
                      </Text>
                    </Flex>
                  </Flex>

                  {paid && (
                    <Flex flexDir="column" mt="6">
                      <Text color="#333" fontSize="lg">
                        Como será o formato do seu modelo assinatura?
                      </Text>
                      <Flex mt="4">
                        <Checkbox
                          onChange={() => {
                            if (model === "lifetime") {
                              setModel("recurrent");
                            }
                          }}
                          isChecked={model === "recurrent" && true}
                          colorScheme="green"
                        />
                        <Text
                          cursor="pointer"
                          ml="2"
                          onClick={() => {
                            if (model === "lifetime") {
                              setModel("recurrent");
                            }
                          }}
                          color="#333"
                        >
                          Recorrente (assinatura mensal)
                        </Text>
                      </Flex>
                      <Flex mt="4">
                        <Checkbox
                          colorScheme="green"
                          onChange={() => {
                            if (model === "recurrent") {
                              setModel("lifetime");
                            }
                          }}
                          isChecked={model === "lifetime" && true}
                        />
                        <Text
                          cursor="pointer"
                          onClick={() => {
                            if (model === "recurrent") {
                              setModel("lifetime");
                            }
                          }}
                          ml="2"
                          color="#333"
                        >
                          Vitalícia (pagamento único)
                        </Text>
                      </Flex>
                    </Flex>
                  )}

                  {paid && (
                    <Flex flexDir="column" mt="6">
                      <Text color="#333" fontSize="lg">
                        Qual será o valor{" "}
                        {model === "recurrent" ? "mensal" : "vitalício"} do seu
                        curso?
                      </Text>
                      <Input
                        style={{
                          marginTop: 10,
                          borderRadius: 5,
                          padding: 10,
                          maxWidth: 90,
                          color: "#777",
                          height: 50,
                          border: "1px solid #e0e0e0",
                        }}
                        placeholder="R$"
                        value={price}
                        onChange={handlePriceChange}
                      />
                    </Flex>
                  )}

                  <Flex
                    onClick={() => {
                      if (!category) {
                        toast({
                          position: "top",
                          status: "error",
                          description: "Você precisa selecionar uma categoria",
                          duration: 1000,
                        });
                      } else if (!paid) {
                        setTimeout(() => {
                          toast({
                            position: "top",
                            status: "success",
                            description: "Dados validados com sucesso",
                            duration: 1000,
                          });
                        }, 250);
                        setTimeout(() => {
                          setPage(3);
                          setCategoryAdded(true);
                        }, 750);
                      } else if (!price) {
                        toast({
                          position: "top",
                          status: "error",
                          description: `Você precisa inserir um valor ${
                            model === "recurrent" ? "mensal" : "vitalício"
                          }`,
                          duration: 1000,
                        });
                      } else {
                        setTimeout(() => {
                          toast({
                            position: "top",
                            status: "success",
                            description: "Dados validados com sucesso",
                            duration: 1000,
                          });
                        }, 250);
                        setTimeout(() => {
                          setPage(3);
                          setCategoryAdded(true);
                        }, 750);
                      }
                    }}
                    cursor="pointer"
                    mt="6"
                    borderRadius="5"
                    bg="#f00066"
                    py="3"
                    justify="center"
                    align="center"
                  >
                    <Text fontWeight="bold" color="#FFF">
                      Próximo
                    </Text>
                  </Flex>
                  {size.width > 300 && <Flex py="2" />}
                </Flex>
              ) : page === 3 ? (
                <Flex
                  justify="space-between"
                  flexDir="column"
                  w={size.width < 1000 ? "100%" : "50%"}
                >
                  <Flex flexDir="column" h="100%" justify="space-between">
                    <Flex flexDir="column">
                      <Text fontSize="md" color="#333">
                        Capa do curso
                      </Text>
                      <Image
                        mt="2"
                        src={preview}
                        maxH={160}
                        maxW={160}
                        borderRadius="5"
                      />
                      <Text mt="6" fontSize="md" color="#333">
                        Nome do curso
                      </Text>
                      <Text fontSize="2xl" color="#333" fontWeight="bold">
                        {name}
                      </Text>
                      <Text mt="2" fontSize="md" color="#333">
                        Categoria
                      </Text>
                      <Flex
                        mt="2"
                        borderRadius="full"
                        border="1px solid #e0e0e0"
                        justify="center"
                        maxW={200}
                        py="2"
                        align="center"
                      >
                        <Text color="#333" fontWeight="bold">
                          {category}
                        </Text>
                      </Flex>
                      {size.width > 1000 && (
                        <Flex mt="4" flexDir="column">
                          <Text fontSize="md" color="#333">
                            Modelo de assinatura
                          </Text>
                          <Text fontSize="2xl" color="#333" fontWeight="bold">
                            {paid ? "Pago" : "Gratuíto"}
                          </Text>
                          <Text mt="4" fontSize="md" color="#333">
                            Formato do modelo de assinatura
                          </Text>
                          <Text fontSize="2xl" color="#333" fontWeight="bold">
                            {model === "recurrent" ? "Recorrente" : "Vitalícia"}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                    {size.width > 1000 && (
                      <Flex flexDir="column" pb="2">
                        <Text mt="4" fontSize="md" color="#333">
                          Ao confirmar você confirma que leu e concorda com
                          nossos
                        </Text>
                        <Text
                          maxW={"99%"}
                          fontSize="md"
                          color="#333"
                          fontWeight="bold"
                          textDecorationLine="underline"
                        >
                          Termos de serviço
                        </Text>
                      </Flex>
                    )}
                    {size.width < 1000 && (
                      <Flex flexDir="column">
                        <Text mt="4" fontSize="md" color="#333">
                          Modelo de assinatura
                        </Text>
                        <Text fontSize="2xl" color="#333" fontWeight="bold">
                          {paid ? "Pago" : "Gratuíto"}
                        </Text>
                        {paid && (
                          <Flex
                            flexDir={size.width < 1000 ? "column" : "row"}
                            align={size.width < 1000 ? "normal" : "center"}
                            justify="space-between"
                          >
                            <Flex flexDir="column">
                              <Text mt="4" fontSize="md" color="#333">
                                Formato do modelo de assinatura
                              </Text>
                              <Text
                                fontSize="2xl"
                                color="#333"
                                fontWeight="bold"
                              >
                                {model === "recurrent"
                                  ? "Recorrente"
                                  : "Vitalícia"}
                              </Text>
                            </Flex>
                            <Flex flexDir="column">
                              <Text mt="4" fontSize="md" color="#333">
                                Valor{" "}
                                {model === "recurrent" ? "mensal" : "vitalício"}
                              </Text>
                              <Text
                                fontSize="4xl"
                                color="#333"
                                fontWeight="bold"
                              >
                                {price}
                              </Text>
                            </Flex>
                          </Flex>
                        )}
                        <Flex flexDir="column">
                          <Text mt="4" fontSize="md" color="#333">
                            Descrição
                          </Text>
                          <Text
                            maxW={"99%"}
                            fontSize={description.length < 200 ? "xl" : "lg"}
                            color="#333"
                            fontWeight="bold"
                          >
                            <ReactMarkdown children={description} />
                          </Text>
                          <Text mt="4" fontSize="md" color="#333">
                            Ao confirmar você confirma que leu e concorda com
                            nossos
                          </Text>
                          <Text
                            maxW={"99%"}
                            fontSize="md"
                            color="#333"
                            fontWeight="bold"
                            textDecorationLine="underline"
                          >
                            Termos de serviço
                          </Text>
                        </Flex>
                        <Flex
                          cursor="pointer"
                          onClick={handleCreateCourse}
                          mt="4"
                          bg="#f00066"
                          borderRadius="5"
                          w="100%"
                          py="3"
                          justify="center"
                          align="center"
                        >
                          <Text color="#FFF" fontWeight="bold">
                            Confirmar
                          </Text>
                        </Flex>
                        <Flex py="2"></Flex>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              ) : null}
              {size.width > 1000 && (
                <Flex
                  w="60%"
                  justify="space-between"
                  borderRadius="5"
                  ml="4"
                  bg="#f00066"
                  flexDir="column"
                  p="10"
                >
                  {page === 1 ? (
                    <Flex flexDir="column" h="100%" justify="space-between">
                      <Text color="#FFF" fontWeight="bold" fontSize="2xl">
                        A plataforma completa para transformar criadores de
                        conteúdo em empreendedores
                      </Text>
                      <Flex flexDir="column" mt="10">
                        <Flex align="center">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiUserCircle}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Área de membros grátis
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Hospede e gerencie o seu curso online na nossa
                              plataforma, sem custos extras.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiUserCheck}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Liberação do produto direto na página de obrigado
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Seu cliente não precisa abrir o e-mail para ter
                              acesso ao curso.
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiBadgeCheck}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Emissão de certificado
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Ao completar o seu curso seus alunos terão um
                              certificado do seu curso.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiCalendar}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Planos de assinatura
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Escolha o melhor modelo de assinatura para o seu
                              curso.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiLineChart}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Dados sobre seu curso
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Relatórios com todos os dados importantes sobre
                              seu curso.
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex justify="space-between" align="center" mt="4">
                        <Text color="#FFF" fontWeight="bold" fontSize="lg">
                          Tudo isso e muito mais
                        </Text>
                        <Flex flexDir="column">
                          <Flex
                            onClick={() => {
                              onClose();
                              router.push("/admin");
                            }}
                            _hover={{
                              opacity: 0.9,
                            }}
                            align="center"
                            cursor="pointer"
                            bg="#FFF"
                            borderRadius="5"
                            py="2"
                            px="4"
                          >
                            <Text color="#f00066" fontSize="md">
                              Explore um mundo de oportunidades
                            </Text>
                            <Icon
                              ml="2"
                              as={RiArrowRightLine}
                              color="#f00066"
                              fontSize="sm"
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  ) : page === 2 ? (
                    <Flex flexDir="column" h="100%" justify="space-between">
                      <Text color="#FFF" fontWeight="bold" fontSize="2xl">
                        A plataforma completa para transformar criadores de
                        conteúdo em empreendedores
                      </Text>
                      <Flex flexDir="column" mt="10">
                        <Flex align="center">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiUserCircle}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Área de membros grátis
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Hospede e gerencie o seu curso online na nossa
                              plataforma, sem custos extras.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiUserCheck}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Liberação do produto direto na página de obrigado
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Seu cliente não precisa abrir o e-mail para ter
                              acesso ao curso.
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiBadgeCheck}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Emissão de certificado
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Ao completar o seu curso seus alunos terão um
                              certificado do seu curso.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiCalendar}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Planos de assinatura
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Escolha o melhor modelo de assinatura para o seu
                              curso.
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex align="center" mt="4">
                          <Flex
                            bg="#fff"
                            borderRadius="full"
                            justify="center"
                            align="center"
                            p="4"
                            style={{
                              height: 40,
                              width: 40,
                            }}
                          >
                            <Icon
                              as={BiLineChart}
                              fontSize="xl"
                              color="#f00066"
                            />
                          </Flex>
                          <Flex flexDir="column" ml="4">
                            <Text color="#FFF" fontWeight="bold" fontSize="lg">
                              Dados sobre seu curso
                            </Text>
                            <Text color="#FFF" fontSize="sm">
                              Relatórios com todos os dados importantes sobre
                              seu curso.
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex justify="space-between" align="center" mt="4">
                        <Text color="#FFF" fontWeight="bold" fontSize="lg">
                          Tudo isso e muito mais
                        </Text>
                        <Flex flexDir="column">
                          <Flex
                            _hover={{
                              opacity: 0.9,
                            }}
                            align="center"
                            cursor="pointer"
                            bg="#FFF"
                            borderRadius="5"
                            py="2"
                            px="4"
                          >
                            <Text color="#f00066" fontSize="md">
                              Explorar tutorial
                            </Text>
                            <Icon
                              ml="2"
                              as={RiArrowRightLine}
                              color="#f00066"
                              fontSize="sm"
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  ) : page === 3 ? (
                    <Flex flexDir="column" h="100%" justify="space-between">
                      <Flex flexDir="column">
                        <Flex flexDir="column">
                          <Text fontSize="md" color="#FFF">
                            Descrição
                          </Text>
                          <Text
                            mt="2"
                            maxW={"99%"}
                            fontSize={description.length < 200 ? "xl" : "lg"}
                            color="#FFF"
                            fontWeight="bold"
                          >
                            <ReactMarkdown children={description} />
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex flexDir="column">
                        <Flex flexDir="column">
                          <Text mt="4" fontSize="md" color="#FFF">
                            Valor{" "}
                            {model === "recurrent" ? "mensal" : "vitalício"}
                          </Text>
                          <Text fontSize="4xl" color="#FFF" fontWeight="bold">
                            {price}
                          </Text>
                        </Flex>
                        <Flex
                          onClick={handleCreateCourse}
                          cursor="pointer"
                          _hover={{
                            backgroundColor: "#FFF",
                            color: "#f00066",
                          }}
                          mt="2"
                          bg="#f00066"
                          border="1px solid #FFF"
                          color="#FFF"
                          fontWeight="bold"
                          borderRadius="5"
                          w="100%"
                          py="3"
                          justify="center"
                          align="center"
                        >
                          Confirmar
                        </Flex>
                      </Flex>
                    </Flex>
                  ) : null}
                </Flex>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
